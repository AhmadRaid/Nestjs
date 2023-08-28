import { Module } from '@nestjs/common';
import { TenantTypeController } from './tenant-type.controller';
import { TenantTypeService } from './tenant-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantType } from './entity/tenant-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TenantType])],
  controllers: [TenantTypeController],
  providers: [TenantTypeService],
  exports: [TenantTypeService],
})
export class TenantTypeModule { }
