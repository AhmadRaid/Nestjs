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

import { Tenant } from './entity/tenant.entity';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@ApiTags('Tenants')
@Crud({
  model: {
    type: Tenant,
  },
  dto: {
    create: CreateTenantDto,
    update: UpdateTenantDto,
  },
})
@Controller('Tenant')
export class TenantController implements CrudController<Tenant> {
  constructor(public service: TenantService) { }

  get base(): CrudController<Tenant> {
    return this;
  }

  @Override()
  @ApiOperation({ summary: 'Get all Tenants' })
  @ApiResponse({
    status: 200,
    description: 'List of Tenants',
    type: Tenant,
    isArray: true,
  })
  async getMany(@ParsedRequest() req: CrudRequest) {
    return this.base.getManyBase(req);
  }

  @Override('getOneBase')
  @ApiOperation({ summary: 'Get a Tenant by ID' })
  @ApiResponse({ status: 200, description: 'The found Tenant', type: Tenant })
  @ApiNotFoundResponse({ description: 'Tenant not found' })
  async getOne(@ParsedRequest() req: CrudRequest) {
    return this.base.getOneBase(req);
  }

  @Override('createOneBase')
  @ApiOperation({ summary: 'Create a new Tenant' })
  @ApiCreatedResponse({ description: 'The created Tenant', type: Tenant })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Tenant,
  ) {
    return this.base.createOneBase(req, dto);
  }

  @Override('createManyBase')
  @ApiOperation({ summary: 'Create multiple Tenants' })
  @ApiResponse({
    status: 200,
    description: 'The created TenFants',
    type: Tenant,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async createMany(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateManyDto<Tenant>,
  ) {
    return this.base.createManyBase(req, dto);
  }

  @Override('updateOneBase')
  @ApiOperation({ summary: 'Update a Tenant by ID' })
  @ApiResponse({ status: 200, description: 'The updated Tenant', type: Tenant })
  @ApiNotFoundResponse({ description: 'Tenant not found' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Tenant,
  ) {
    return this.base.updateOneBase(req, dto);
  }

  @Override('replaceOneBase')
  @ApiOperation({ summary: 'Replace a Tenant by ID' })
  @ApiResponse({ status: 200, description: 'Success message' })
  @ApiNotFoundResponse({ description: 'Tenant not found' })
  async replaceOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: Tenant,
  ) {
    return this.base.replaceOneBase(req, dto);
  }

  @Override('deleteOneBase')
  @ApiOperation({ summary: 'Delete a Tenant by ID' })
  @ApiResponse({ status: 200, description: 'Success message' })
  @ApiNotFoundResponse({ description: 'Tenant not found' })
  async deleteOne(@ParsedRequest() req: CrudRequest) {
    const Tenant = await this.base.getOneBase(req);
    const isDeleted = await this.base.deleteOneBase(req);
    return isDeleted;
  }
}
