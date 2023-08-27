import { Module } from '@nestjs/common';
import { Tenant } from './tenant';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';

@Module({
  controllers: [TenantController],
  providers: [Tenant, TenantService],
})
export class TenantModule {}
