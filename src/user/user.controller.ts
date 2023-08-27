import {
  Crud,
  Override,
  ParsedBody,
  CrudRequest,
  ParsedRequest,
  CreateManyDto,
  CrudController,
} from '@nestjsx/crud';
import { Controller } from '@nestjs/common';

import { User } from './Entity/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  async getMany(@ParsedRequest() req: CrudRequest) {
    try {
      const users = await this.base.getManyBase(req);
      return users;
    } catch (error) {
      return error;
    }
  }

  @Override('getOneBase')
  async getOne(@ParsedRequest() req: CrudRequest) {
    try {
      const user = await this.base.getOneBase(req);
      return user;
    } catch (error) {
      return error;
    }
  }

  @Override('createOneBase')
  async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: User) {
    try {
      const user = await this.base.createOneBase(req, dto);
      return user;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  @Override('createManyBase')
  async createMany(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateManyDto<User>,
  ) {
    try {
      const users = await this.base.createManyBase(req, dto);
      return users;
    } catch (error) {
      return error;
    }
  }

  @Override('updateOneBase')
  async updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: User) {
    try {
      const user = await this.base.updateOneBase(req, dto);
      return user;
    } catch (error) {
      return error;
    }
  }

  @Override('replaceOneBase')
  async replaceOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: User) {
    try {
      const user = await this.base.replaceOneBase(req, dto);
      return user;
    } catch (error) {
      return error;
    }
  }

  @Override('deleteOneBase')
  async deleteOne(@ParsedRequest() req: CrudRequest) {
    try {
      const user = await this.base.getOneBase(req);
      const isDeleted = await this.base.deleteOneBase(req);
      return isDeleted;
    } catch (error) {
      return error;
    }
  }
}
