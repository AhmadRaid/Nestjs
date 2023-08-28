import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { TenantType } from './entity/tenant-type.entity';

@Injectable()
export class TenantTypeService extends TypeOrmCrudService<TenantType> {
  constructor(@InjectRepository(TenantType) repo) {
    super(repo);
  }
}
