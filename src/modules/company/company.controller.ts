

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

import { Company } from './entity/company.entity';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('companies')
@Crud({
    model: {
        type: Company,
    },
    dto: {
        create: CreateCompanyDto,
        update: UpdateCompanyDto,
    },
})
@Controller('companies')
export class CompanyController implements CrudController<Company> {
    constructor(public service: CompanyService) { }

    get base(): CrudController<Company> {
        return this;
    }

    @Override()
    @ApiOperation({ summary: 'Get all companies' })
    @ApiResponse({
        status: 200,
        description: 'List of companies',
        type: Company,
        isArray: true,
    })
    async getMany(@ParsedRequest() req: CrudRequest) {
        return this.base.getManyBase(req);
    }

    @Override('getOneBase')
    @ApiOperation({ summary: 'Get a Company by ID' })
    @ApiResponse({ status: 200, description: 'The found Company', type: Company })
    @ApiNotFoundResponse({ description: 'User not found' })
    async getOne(@ParsedRequest() req: CrudRequest) {
        return this.base.getOneBase(req);
    }

    @Override('createOneBase')
    @ApiOperation({ summary: 'Create a new Company' })
    @ApiCreatedResponse({ description: 'The created Company', type: Company })
    @ApiBadRequestResponse({ description: 'Invalid input' })
    async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Company) {
        return this.base.createOneBase(req, dto);
    }

    @Override('createManyBase')
    @ApiOperation({ summary: 'Create multiple companies' })
    @ApiResponse({
        status: 200,
        description: 'The created companies',
        type: Company,
        isArray: true,
    })
    @ApiBadRequestResponse({ description: 'Invalid input' })
    async createMany(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<Company>,
    ) {
        return this.base.createManyBase(req, dto);
    }

    @Override('updateOneBase')
    @ApiOperation({ summary: 'Update a Company by ID' })
    @ApiResponse({ status: 200, description: 'The updated Company', type: Company })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiBadRequestResponse({ description: 'Invalid input' })
    async updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Company) {
        return this.base.updateOneBase(req, dto);
    }

    @Override('replaceOneBase')
    @ApiOperation({ summary: 'Replace a Company by ID' })
    @ApiResponse({ status: 200, description: 'Success message' })
    @ApiNotFoundResponse({ description: 'User not found' })
    async replaceOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Company) {
        return this.base.replaceOneBase(req, dto);
    }

    @Override('deleteOneBase')
    @ApiOperation({ summary: 'Delete a Company by ID' })
    @ApiResponse({ status: 200, description: 'Success message' })
    @ApiNotFoundResponse({ description: 'User not found' })
    async deleteOne(@ParsedRequest() req: CrudRequest) {
        const Company = await this.base.getOneBase(req);
        const isDeleted = await this.base.deleteOneBase(req);
        return isDeleted;
    }
}
