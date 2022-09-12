export interface Config {
  telegram: {
    token: string;
  };
  debug: boolean;
  postgres: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  weather: {
    key: string;
  };
}
