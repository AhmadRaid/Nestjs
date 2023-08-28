import fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

const nodeEnv: string = process.env.NODE_ENV || 'development';
const envFile: string = `.env.${nodeEnv}`;
dotenv.config({ path: envFile });

interface SeedConfig {
  type: string;
  host: string;
  port: number | string;
  username: string;
  password: string;
  database: string;
  logging: boolean;
  synchronize: boolean;
  seeds: string[];
  entities: string[];
  factories: string[];
  migrations: string[];
  cli: {
    migrationsDir: string;
  };
}

const seedConfig: SeedConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_HOSTNAME || 'localhost',
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
  username: process.env.POSTGRES_USERNAME || 'abdelrhmankouta',
  password: process.env.POSTGRES_PASSWORD || '',
  database: process.env.POSTGRES_DATABASE || 'notifications',
  logging: nodeEnv === 'development',
  synchronize: nodeEnv === 'development',
  seeds: ['src/database/seeds/**/*.ts'],
  entities: ['src/database/entities/**/*.ts'],
  factories: ['src/database/factories/**/*.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

const seedConfigPath: string = path.resolve('src/database/configs/seed.json');

fs.writeFileSync(seedConfigPath, JSON.stringify(seedConfig, null, 2));

console.log(`🌱 seed.json created at ${seedConfigPath}`);
