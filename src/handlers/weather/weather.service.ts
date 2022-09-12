import axios from 'axios';
import { OpenWeatherApi } from './type/OpenWeatherApi';
import { config } from 'config';
import { logger } from 'logger';

/**
 * API limits:
 * 60 calls/minute
 * 1,000,000 calls/month
 *
 * the class gets the weather and caches the responses
 */
export class CanadaWeather {
  /**
   * minutes * seconds * milliseconds
   * 5 minutes = 300000 milliseconds
   */
  private readonly ttl = 300000;
  private readonly axios = axios;
  private readonly config = config;
  private readonly logger = logger;

  private cache: string;
  private lastTimestampQuery: number;

  private async getWeatherWithApi() {
    const { data } = await this.axios.get<OpenWeatherApi>(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          appid: this.config.weather.key,
          lang: 'ru',
          units: 'metric',
          q: 'Canada',
        },
      },
    );

    this.logger.debug('calling the weather server');
    this.lastTimestampQuery = Date.now();

    return data;
  }

  private formMessage(data: OpenWeatherApi) {
    const header = '<b>Погода в Канаде</b>\n';
    const temp = `Температура: ${data.main.temp}°C\n`;
    const humidity = `Влажность: ${data.main.humidity}%\n`;
    const wind = `Ветер: ${data.wind.speed} м/с`;

    return header + temp + humidity + wind;
  }

  async get() {
    // if the first call or time elapsed equal to tll -> contact api server
    if (
      !this.lastTimestampQuery ||
      this.lastTimestampQuery + this.ttl < Date.now()
    ) {
      const data = await this.getWeatherWithApi();
      const message = this.formMessage(data);
      this.cache = message;
    }

    return this.cache;
  }
}
