import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Tenant } from './entity/tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TenantService extends TypeOrmCrudService<Tenant> {
  constructor(@InjectRepository(Tenant) repo) {
    super(repo);
  }
}
