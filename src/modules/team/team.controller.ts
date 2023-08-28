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

import { Team } from './entity/Team.entity';
import { CreateTeamDto } from './dto/create-Team.dto';
import { UpdateTeamDto } from './dto/update-Team.dto';
import { TeamService } from './Team.service';

@ApiTags('Teams')
@Crud({
    model: {
        type: Team,
    },
    dto: {
        create: CreateTeamDto,
        update: UpdateTeamDto,
    },
})
@Controller('Team')
export class TeamController implements CrudController<Team> {
    constructor(public service: TeamService) { }

    get base(): CrudController<Team> {
        return this;
    }

    @Override()
    @ApiOperation({ summary: 'Get all Teams' })
    @ApiResponse({
        status: 200,
        description: 'List of Teams',
        type: Team,
        isArray: true,
    })
    async getMany(@ParsedRequest() req: CrudRequest) {
        return this.base.getManyBase(req);
    }

    @Override('getOneBase')
    @ApiOperation({ summary: 'Get a Team by ID' })
    @ApiResponse({ status: 200, description: 'The found Team', type: Team })
    @ApiNotFoundResponse({ description: 'Team not found' })
    async getOne(@ParsedRequest() req: CrudRequest) {
        return this.base.getOneBase(req);
    }

    @Override('createOneBase')
    @ApiOperation({ summary: 'Create a new Team' })
    @ApiCreatedResponse({ description: 'The created Team', type: Team })
    @ApiBadRequestResponse({ description: 'Invalid input' })
    async createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Team,
    ) {
        return this.base.createOneBase(req, dto);
    }

    @Override('createManyBase')
    @ApiOperation({ summary: 'Create multiple Teams' })
    @ApiResponse({
        status: 200,
        description: 'The created Teams',
        type: Team,
        isArray: true,
    })
    @ApiBadRequestResponse({ description: 'Invalid input' })
    async createMany(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: CreateManyDto<Team>,
    ) {
        return this.base.createManyBase(req, dto);
    }

    @Override('updateOneBase')
    @ApiOperation({ summary: 'Update a Team by ID' })
    @ApiResponse({ status: 200, description: 'The updated Team', type: Team })
    @ApiNotFoundResponse({ description: 'Team not found' })
    @ApiBadRequestResponse({ description: 'Invalid input' })
    async updateOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Team,
    ) {
        return this.base.updateOneBase(req, dto);
    }

    @Override('replaceOneBase')
    @ApiOperation({ summary: 'Replace a Team by ID' })
    @ApiResponse({ status: 200, description: 'Success message' })
    @ApiNotFoundResponse({ description: 'Team not found' })
    async replaceOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Team,
    ) {
        return this.base.replaceOneBase(req, dto);
    }

    @Override('deleteOneBase')
    @ApiOperation({ summary: 'Delete a Team by ID' })
    @ApiResponse({ status: 200, description: 'Success message' })
    @ApiNotFoundResponse({ description: 'Team not found' })
    async deleteOne(@ParsedRequest() req: CrudRequest) {
        const Team = await this.base.getOneBase(req);
        const isDeleted = await this.base.deleteOneBase(req);
        return isDeleted;
    }
}

