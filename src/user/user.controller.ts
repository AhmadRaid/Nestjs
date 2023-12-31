import { Entity } from 'typeorm';
import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";

import { User } from "./Entity/user.entity";
import { UserService } from "./user.service";

@Crud({
  model: {
    type: User,
  },
})
@Controller("users")
export class UserController implements CrudController<User> {
  constructor(public service: UserService) { }

  // @Get()
  // async findAll() {
  //   await this.service.create(user);
  // }

}