import { Module } from '@nestjs/common';
import { TenantModule } from '../tenant/tenant.module';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { TeamController } from '../team/team.controller';
import { TeamModule } from '../team/team.module';
import { TenantTypeService } from '../tenant-type/tenant-type.service';
import { TenantTypeModule } from '../tenant-type/tenant-type.module';
import { TenantConfigurationController } from '../tenant-configuration/tenant-configuration.controller';
import { TenantConfigurationService } from '../tenant-configuration/tenant-configuration.service';
import { TenantConfigurationModule } from '../tenant-configuration/tenant-configuration.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456789',
      database: 'postgres',
      entities: [User], // Import User entity here
      synchronize: true,
    }),
    UserModule,
    TeamModule,
    TenantTypeModule,
    TenantConfigurationModule,
  ],
  controllers: [TeamController, TenantConfigurationController],
  providers: [TenantTypeService, TenantConfigurationService],
})
export class AppModule {}
