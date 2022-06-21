import {
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-input';
import { LoginResponse } from './dto/login-response';
import { GqlAuthGuard } from './gql-auth.guard';
import { User } from '../users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  // login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    // return this.authService.login(loginUserInput); es lo mismo
    return this.authService.login(context.user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Mutation(() => User)
  signup(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    // return this.authService.login(loginUserInput);
    return this.authService.signup(loginUserInput);
  }
}
