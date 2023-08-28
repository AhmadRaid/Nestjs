import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        keepConnectionAlive: true,
        migrationsTransactionMode: 'each',
        logging: process.env.NODE_ENV === 'development',
        synchronize: process.env.NODE_ENV === 'development',
        autoLoadEntities: process.env.NODE_ENV === 'development',
        host: configService.get<string>('POSTGRES_HOST') || 'localhost',
        port: configService.get<number>('POSTGRES_PORT') || 5432,
        username:
          configService.get<string>('POSTGRES_USERNAME') || 'abdelrhmankouta',
        password: configService.get<string>('POSTGRES_PASSWORD') || '',
        database:
          configService.get<string>('POSTGRES_DATABASE') || 'notifications',
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule { }
