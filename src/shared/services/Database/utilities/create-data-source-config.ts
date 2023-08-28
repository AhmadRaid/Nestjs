import fs from 'fs';
import { join } from 'path';
import * as path from 'path';
import * as dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV || 'development';
const envFile = `.env.${nodeEnv}`;
dotenv.config({ path: envFile });

const content = `import { DataSource } from "typeorm";

const config = new DataSource({
  type: "postgres",
  host: "${process.env.POSTGRES_HOSTNAME || 'localhost'}",
  port: ${
    process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432
  } ,
  username: "${process.env.POSTGRES_USERNAME || 'abdelrhmankouta'}",
  password: "${process.env.POSTGRES_PASSWORD || ''}",
  database: "${process.env.POSTGRES_DATABASE || 'notifications'}",
  logging: ${nodeEnv === 'development'},
  migrationsTransactionMode: "each",
  migrationsTableName: "migrations",
  synchronize: ${nodeEnv === 'development'},
  entities: ["${[
    join(
      __dirname,
      '..',
      '..',
      '..',
      'src',
      'database',
      'entities',
      '**',
      '*{.ts,.js}',
    ),
  ]}"],
  migrations: ["${[
    join(
      __dirname,
      '..',
      '..',
      '..',
      'src',
      'database',
      'migrations',
      '**',
      '*{.ts,.js}',
    ),
  ]}"],
});

export default config;
`;

const dataSourceConfigPath: string = path.resolve(
  'src/database/configs/data-source.ts',
);

fs.writeFileSync(dataSourceConfigPath, content);

console.log(`🌱 data-source.ts created at ${dataSourceConfigPath}`);
