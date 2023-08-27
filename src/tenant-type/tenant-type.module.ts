import { Module } from '@nestjs/common';
import { TenantTypeController } from './tenant-type.controller';

@Module({
  controllers: [TenantTypeController],
})
export class TenantTypeModule {}
