import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
// import { LoginUserInput } from './dto/login-input';
import { User } from 'src/users/entities/user.entity';
import { LoginUserInput } from './dto/login-input';

@Injectable()
export class AuthService {
  constructor(
    private usersSerive: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersSerive.findOne(username);

    const valid = await bcrypt.compare(password, user?.password);

    if (user && valid) {
      const { password, ...results } = user;
      return results;
    }
    return null;
  }

  // async login(loginUserInput: LoginUserInput) {
  async login(user: User) {
    // const user = await this.usersSerive.findOne(loginUserInput.username);
    // const { password, ...results } = user;

    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user,
    };
  }

  async signup(loginUserInput: LoginUserInput) {
    const password = await bcrypt.hash(loginUserInput.password, 10);

    const newUser = await this.usersSerive.create({
      ...loginUserInput,
      password,
    });
    return {
      access_token: this.jwtService.sign({
        username: newUser.username,
        sub: newUser.id,
      }),
      user: newUser,
    };
  }
}
