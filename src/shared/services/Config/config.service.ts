import * as dotenv from 'dotenv';
import * as winston from 'winston';
import { SASLOptions, SASLMechanism } from 'kafkajs';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import DailyRotateFile from 'winston-daily-rotate-file';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { ConfigService as NestConfigService } from '@nestjs/config';

export class ConfigService extends NestConfigService {
  constructor() {
    super();
    const envPath = `.env.${this.nodeEnv}`;
    dotenv.config({ path: envPath });

    if (this.nodeEnv === 'development') {
      console.info(process.env);
    }
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV || 'development';
  }

  get(key: string): string {
    return process.env[key];
  }

  getNumber(key: string): number {
    return Number(this.get(key));
  }

  getBoolean(key: string): boolean {
    return Boolean(this.get(key));
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      keepConnectionAlive: true,
      host: this.get('POSTGRES_HOST'),
      migrationsTransactionMode: 'each',
      port: this.getNumber('POSTGRES_PORT'),
      username: this.get('POSTGRES_USERNAME'),
      password: this.get('POSTGRES_PASSWORD'),
      database: this.get('POSTGRES_DATABASE'),
      logging: this.nodeEnv === 'development',
      synchronize: this.nodeEnv === 'development',
    };
  }

  get kafkaConfig(): KafkaOptions {
    const requiredVariables = [
      'KAFKA_BROKERS',
      'KAFKA_GROUP_ID',
      'KAFKA_CLIENT_ID',
      'KAFKA_ENABLE_SSL',
    ];

    for (const variable of requiredVariables) {
      if (!process.env[variable]) {
        throw new Error(`${variable} environment variable must be defined`);
      }
    }

    const kafkaGroupId = process.env.KAFKA_GROUP_ID;
    const kafkaUsername = process.env.KAFKA_USERNAME;
    const kafkaPassword = process.env.KAFKA_PASSWORD;
    const kafkaClientId = process.env.KAFKA_CLIENT_ID;
    const kafkaBrokersString = process.env.KAFKA_BROKERS;
    const kafkaEnableSSL = process.env.KAFKA_ENABLE_SSL === 'true';
    const kafkaMechanism = process.env.KAFKA_MECHANISM || 'scram-sha-512';

    const consumerGroupId = kafkaGroupId
      ? `${process.env.KAFKA_GROUP_PREFIX}-${kafkaGroupId}`
      : kafkaGroupId;

    const clientOptions: KafkaOptions['options']['client'] = {
      clientId: kafkaClientId,
      brokers: [...kafkaBrokersString.split(',')],
      ssl: kafkaEnableSSL,
      logLevel: 5,
    };

    //@todo fix here
    if (kafkaUsername && kafkaPassword) {
      if (
        ['plain', 'scram-sha-256', 'scram-sha-512'].includes(kafkaMechanism)
      ) {
        clientOptions.sasl = {
          mechanism: kafkaMechanism as SASLMechanism,
          username: kafkaUsername,
          password: kafkaPassword,
        } as SASLOptions;
      }
    }

    return {
      transport: Transport.KAFKA,
      options: {
        client: clientOptions,
        producer: {
          metadataMaxAge: 3000,
        },
        consumer: {
          rebalanceTimeout: 3000,
          groupId: consumerGroupId,
        },
      },
    };
  }

  get winstonConfig(): winston.LoggerOptions {
    return {
      transports: [
        new DailyRotateFile({
          level: 'debug',
          filename: `./logs/${this.nodeEnv}/debug-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        new DailyRotateFile({
          level: 'error',
          filename: `./logs/${this.nodeEnv}/error-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxSize: '20m',
          maxFiles: '30d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
            winston.format.simple(),
          ),
        }),
      ],
      exitOnError: false,
    };
  }
}
