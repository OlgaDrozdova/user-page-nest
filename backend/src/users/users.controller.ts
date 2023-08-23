import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createUserDto } from 'src/dto/create.user.dto';
import { UserService } from './user.service';

@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UserService) {}
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Post()
  addUser(@Body() dto: createUserDto) {
    return this.usersService.addUser(dto.email);
  }

  searchUser() {
    return 'UAUUU';
  }
}
