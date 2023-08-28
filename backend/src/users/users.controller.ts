import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { LogInDto } from 'src/dto/login.dto';
import { RegistrationDto } from 'src/dto/registration.dto';
import { UpdateDto } from 'src/dto/update.dto';
import { UserService } from './user.service';

@Controller('api')
export class UsersController {
  constructor(private usersService: UserService) {}
  @Get('users')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('users/:id')
  getUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.getUser(id);
  }

  @Post('login')
  findByLogin(@Body() dto: LogInDto) {
    return this.usersService.findByLogin(dto);
  }

  @Post('registration')
  addUser(@Body() dto: RegistrationDto) {
    return this.usersService.addUser(dto);
  }

  @Post('delete-user')
  deleteUser(@Body() id: string) {
    return this.usersService.deleteUser(id);
  }

  @Post('search-user')
  searchUser(@Body() search: string) {
    return this.usersService.searchUser(search);
  }

  @Put('update-user/:id')
  //@Post('update-user')
  updateUser(@Param('id') id: string, @Body() userUpdateField: UpdateDto) {
    return this.usersService.updateUser(id, userUpdateField);
  }
}
