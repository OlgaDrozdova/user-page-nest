import { Body, Controller, Get, Post } from '@nestjs/common';
import { LogInDto } from 'src/dto/login.dto';
import { RegistrationDto } from 'src/dto/registration.dto';
import { UserService } from './user.service';

@Controller('api')
export class UsersController {
  constructor(private usersService: UserService) {}
  @Get('users')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  //   @Get('users/:id')
  //   getUser(@Param('id', new ParseUUIDPipe()) id: string) {
  //     return this.usersService.getUser(id);
  //   }

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

  searchUser() {
    return 'UAUUU';
  }
}
