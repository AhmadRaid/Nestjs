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

import { TenantType } from './entity/tenant-type.entity';
import { TenantTypeService } from './tenant-type.service';
import { CreateTenantTypeDto } from './dto/create-tenant-type.dto';
import { UpdateTenantTypeDto } from './dto/update-tenant-type.dto';

@ApiTags('TenantType')
@Crud({
  model: {
    type: TenantType,
  },
  dto: {
    create: CreateTenantTypeDto,
    update: UpdateTenantTypeDto,
  },
})
@Controller('tenantType')
export class TenantTypeController implements CrudController<TenantType> {
  constructor(public service: TenantTypeService) { }

  get base(): CrudController<TenantType> {
    return this;
  }

  @Override()
  @ApiOperation({ summary: 'Get all tenant type' })
  @ApiResponse({
    status: 200,
    description: 'List of tenant type',
    type: TenantType,
    isArray: true,
  })
  async getMany(@ParsedRequest() req: CrudRequest) {
    return this.base.getManyBase(req);
  }

  @Override('getOneBase')
  @ApiOperation({ summary: 'Get a tenant type by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found a tenant type',
    type: TenantType,
  })
  @ApiNotFoundResponse({ description: 'Tenant Type not found' })
  async getOne(@ParsedRequest() req: CrudRequest) {
    return this.base.getOneBase(req);
  }

  @Override('createOneBase')
  @ApiOperation({ summary: 'Create a new tenant type' })
  @ApiCreatedResponse({
    description: 'The created tenant type',
    type: TenantType,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: TenantType,
  ) {
    return this.base.createOneBase(req, dto);
  }

  @Override('createManyBase')
  @ApiOperation({ summary: 'Create multiple tenant type' })
  @ApiResponse({
    status: 200,
    description: 'The created tenant type',
    type: TenantType,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async createMany(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateManyDto<TenantType>,
  ) {
    return this.base.createManyBase(req, dto);
  }

  @Override('updateOneBase')
  @ApiOperation({ summary: 'Update a tenant type by ID' })
  @ApiResponse({
    status: 200,
    description: 'The updated tenant type',
    type: TenantType,
  })
  @ApiNotFoundResponse({ description: 'Tenant Type not found' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: TenantType,
  ) {
    return this.base.updateOneBase(req, dto);
  }

  @Override('replaceOneBase')
  @ApiOperation({ summary: 'Replace a tenant type by ID' })
  @ApiResponse({ status: 200, description: 'Success message' })
  @ApiNotFoundResponse({ description: 'Tenant Type not found' })
  async replaceOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: TenantType,
  ) {
    return this.base.replaceOneBase(req, dto);
  }

  @Override('deleteOneBase')
  @ApiOperation({ summary: 'Delete a tenant type by ID' })
  @ApiResponse({ status: 200, description: 'Success message' })
  @ApiNotFoundResponse({ description: 'Tenant Type not found' })
  async deleteOne(@ParsedRequest() req: CrudRequest) {
    const tenantType = await this.base.getOneBase(req);
    const isDeleted = await this.base.deleteOneBase(req);
    return isDeleted;
  }
}
