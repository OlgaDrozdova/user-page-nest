import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async getUser(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.query(id);
    return user;
  }

  async addUser(email: string): Promise<UserEntity> {
    const userByEmail = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (userByEmail) {
      throw 'error';
    }
    let user = new UserEntity();
    user.email = email;
    user = await this.usersRepository.save(user);
    return user;
  }

  async searchUser() {
    return 'UAUUU';
  }
}
