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

import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Crud({
  model: {
    type: User,
  },
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto,
  },
})
@Controller('users')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  get base(): CrudController<User> {
    return this;
  }

  @Override()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: User,
    isArray: true,
  })
  async getMany(@ParsedRequest() req: CrudRequest) {
    return this.base.getManyBase(req);
  }

  @Override('getOneBase')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'The found user', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getOne(@ParsedRequest() req: CrudRequest) {
    return this.base.getOneBase(req);
  }

  @Override('createOneBase')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ description: 'The created user', type: User })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: User) {
    return this.base.createOneBase(req, dto);
  }

  @Override('createManyBase')
  @ApiOperation({ summary: 'Create multiple users' })
  @ApiResponse({
    status: 200,
    description: 'The created users',
    type: User,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async createMany(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateManyDto<User>,
  ) {
    return this.base.createManyBase(req, dto);
  }

  @Override('updateOneBase')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'The updated user', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: User) {
    return this.base.updateOneBase(req, dto);
  }

  @Override('replaceOneBase')
  @ApiOperation({ summary: 'Replace a user by ID' })
  @ApiResponse({ status: 200, description: 'Success message' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async replaceOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: User) {
    return this.base.replaceOneBase(req, dto);
  }

  @Override('deleteOneBase')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'Success message' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async deleteOne(@ParsedRequest() req: CrudRequest) {
    // const user = await this.base.getOneBase(req);
    const isDeleted = await this.base.deleteOneBase(req);
    return isDeleted;
  }
}
