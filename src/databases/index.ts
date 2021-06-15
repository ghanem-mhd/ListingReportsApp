import config from 'config';
import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { dbConfig } from '@interfaces/db.interface';

const { database }: dbConfig = config.get('dbConfig');
export const dbConnection: ConnectionOptions = {
  type: 'sqlite',
  dropSchema: true,
  database: database,
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../**/*.migration{.ts,.js}')],
  subscribers: [path.join(__dirname, '../**/*.subscriber{.ts,.js}')],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
