import { Module, Scope } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import {
  LoggerModule,
  ConfigModule,
  ConfigService,
  DatabaseModule,
} from '@pagexa/module-common-extend';

import { SharedModule } from '../../shared/shared.module';

// Import modules
import { UserModule } from '../user/user.module';
import { HealthModule } from '../health/health.module';
import { TenantModule } from '../tenant/tenant.module';
import { TenantTypeModule } from '@modules/tenant-type/tenant-type.module';
import { TenantConfigurationModule } from '@modules/tenant-configuration/tenant-configuration.module';
import { TeamModule } from '@modules/team/team.module';
import { CompanyModule } from '@modules/company/company.module';

@Module({
  controllers: [],
  imports: [
    ConfigModule,
    LoggerModule,
    HealthModule,
    TenantModule,
    MorganModule,
    DatabaseModule,
    UserModule,
    TeamModule,
    CompanyModule,
    TenantTypeModule,
    TenantConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule, ConfigModule],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: MorganInterceptor('combined'),
    },
  ],
})
export class AppModule { }
