import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { TenantConfiguration } from "./entity/tenant-configuration.entity";


@Injectable()
export class TenantConfigurationService extends TypeOrmCrudService<TenantConfiguration> {
    constructor(@InjectRepository(TenantConfiguration) repo) {
        super(repo);
    }
}
