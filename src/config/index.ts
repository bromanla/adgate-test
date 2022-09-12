import dotenv from 'dotenv';
import { Config } from './config.dto';

const { error } = dotenv.config();

if (error) {
  throw new Error("Couldn't find .env file");
}

export const config: Config = {
  telegram: {
    token: process.env.TELEGRAM_TOKEN ?? '',
  },
  debug: process.env.NODE_ENV !== 'production',
  postgres: {
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: Number(process.env.POSTGRES_PORT) ?? 5432,
    username: process.env.POSTGRES_USER ?? 'root',
    password: process.env.POSTGRES_PASSWORD ?? 'root',
    database: process.env.POSTGRES_DB ?? 'prokatny',
  },
  weather: {
    key: process.env.OPEN_WEATHER_MAP_KEY ?? '',
  },
};
