import {
    Crud,
    Override,
    ParsedBody,
    CrudRequest,
    ParsedRequest,
    CreateManyDto,
    CrudController,
} from '@nestjsx/crud';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

import { TenantConfiguration } from './entity/tenant-configuration.entity';
import { TenantConfigurationService } from './tenant-configuration.service';
import { CreateTenantConfigurationDto } from './dto/create-tenant-configuration.dto';
import { UpdateTenantConfigurationDto } from './dto/update-tenant-configuration.dto';

@ApiTags('tenant-configurations')
@Crud({
    model: {
        type: TenantConfiguration,
    },
    dto: {
        create: CreateTenantConfigurationDto,
        update: UpdateTenantConfigurationDto,
    },
})
@Controller('tenant-configuration-configuration')
export class TenantConfigurationController implements CrudController<TenantConfiguration> {
    constructor(public service: TenantConfigurationService) { }

    get base(): CrudController < TenantConfiguration > {
    return this;
}

@Override()
@ApiOperation({ summary: 'Get all tenant-configurations' })
@ApiResponse({
    status: 200,
    description: 'List of tenant-configurations',
    type: TenantConfiguration,
    isArray: true,
})
async getMany(@ParsedRequest() req: CrudRequest) {
    return this.base.getManyBase(req);
}

@Override('getOneBase')
@ApiOperation({ summary: 'Get a tenant-configuration by ID' })
@ApiResponse({ status: 200, description: 'The found tenant-configuration', type: TenantConfiguration })
@ApiNotFoundResponse({ description: 'tenant-configuration not found' })
async getOne(@ParsedRequest() req: CrudRequest) {
    return this.base.getOneBase(req);
}

@Override('createOneBase')
@ApiOperation({ summary: 'Create a new tenant-configuration' })
@ApiCreatedResponse({ description: 'The created tenant-configuration', type: TenantConfiguration })
@ApiBadRequestResponse({ description: 'Invalid input' })
async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: TenantConfiguration,
) {
    return this.base.createOneBase(req, dto);
}

@Override('createManyBase')
@ApiOperation({ summary: 'Create multiple tenant-configurations' })
@ApiResponse({
    status: 200,
    description: 'The created tenant-configurations',
    type: TenantConfiguration,
    isArray: true,
})
@ApiBadRequestResponse({ description: 'Invalid input' })
async createMany(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateManyDto<TenantConfiguration>,
) {
    return this.base.createManyBase(req, dto);
}

@Override('updateOneBase')
@ApiOperation({ summary: 'Update a tenant-configuration by ID' })
@ApiResponse({ status: 200, description: 'The updated tenant-configuration', type: TenantConfiguration })
@ApiNotFoundResponse({ description: 'tenant-configuration not found' })
@ApiBadRequestResponse({ description: 'Invalid input' })
async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: TenantConfiguration,
) {
    return this.base.updateOneBase(req, dto);
}

@Override('replaceOneBase')
@ApiOperation({ summary: 'Replace a tenant-configuration by ID' })
@ApiResponse({ status: 200, description: 'Success message' })
@ApiNotFoundResponse({ description: 'tenant-configuration not found' })
async replaceOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: TenantConfiguration,
) {
    return this.base.replaceOneBase(req, dto);
}

@Override('deleteOneBase')
@ApiOperation({ summary: 'Delete a tenant-configuration by ID' })
@ApiResponse({ status: 200, description: 'Success message' })
@ApiNotFoundResponse({ description: 'tenant-configuration not found' })
async deleteOne(@ParsedRequest() req: CrudRequest) {
    const tenantConfiguration = await this.base.getOneBase(req);
    const isDeleted = await this.base.deleteOneBase(req);
    return isDeleted;
}
}
