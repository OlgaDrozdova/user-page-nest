import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegistrationDto } from 'src/dto/registration.dto';
import { JwtPayload, LoginStatus, RegistrationStatus } from 'src/types';
import { UserService } from 'src/users/user.service';
import { UserDto } from 'src/dto/user.dto';
import { LogInDto } from 'src/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: RegistrationDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };

    try {
      await this.usersService.addUser(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }

    return status;
  }

  async login(loginUserDto: LogInDto): Promise<LoginStatus> {
    const user = await this.usersService.findByLogin(loginUserDto);
    const token = this._createToken(user);
    return {
      email: user.email,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw 'Invalid token';
    }
    return user;
  }

  private _createToken({ email }: UserDto): any {
    const expire = process.env.EXPIRE + '';
    const user: JwtPayload = { email };
    const accessToken = this.jwtService.sign(user);

    return {
      expire,
      accessToken,
    };
  }
}
