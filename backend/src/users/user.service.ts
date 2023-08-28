import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationDto } from 'src/dto/registration.dto';
import { UserDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Brackets, Repository } from 'typeorm';
import { genSalt, hash, compare } from 'bcrypt';
import { LogInDto } from 'src/dto/login.dto';
import { UpdateDto } from 'src/dto/update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async addUser(userDto: RegistrationDto): Promise<UserDto> {
    const { name, surname, password, email } = userDto;

    const userByEmail = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (userByEmail) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);

    let user = new UserEntity();
    user.name = name;
    user.surname = surname;
    user.email = email;
    user.password = hashPassword;
    user = await this.usersRepository.save(user);

    return user;
  }

  async findByLogin({ email, password }: LogInDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const areEqual = await compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async findByPayload({ email }: any): Promise<UserDto> {
    return await this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async getUser(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async searchUser({ search }: string): Promise<UserEntity[]> {
    const qb = this.usersRepository.createQueryBuilder('users');
    qb.andWhere(
      new Brackets((query) => {
        query
          .where(`users.email ILIKE '%${search}%'`)
          .orWhere(`users.surname ILIKE '%${search}%'`)
          .orWhere(`users.name ILIKE '%${search}%'`);
      }),
    );
    return await qb.getMany();
  }

  async deleteUser(id: string) {
    return await this.usersRepository.delete(id);
  }

  async updateUser(id: string, userUpdateField: UpdateDto) {
    const updUser = await this.usersRepository.update({ id }, userUpdateField);
    if (!updUser.affected) {
      throw new HttpException('Update error', HttpStatus.BAD_REQUEST);
    }
    return await this.getUser(id);
  }
}
