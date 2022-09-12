import 'reflect-metadata';
import { config } from 'config';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

export const Database = new DataSource({
  type: 'postgres',
  host: config.postgres.host,
  port: config.postgres.port,
  username: config.postgres.username,
  password: config.postgres.password,
  database: config.postgres.database,
  synchronize: config.debug,
  logging: false,
  entities: [User],
});

export const userRepository = Database.getRepository(User);
