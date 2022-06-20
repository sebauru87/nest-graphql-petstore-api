import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
// import { UsersService } from '../users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    UsersModule,
    JwtModule.register({
      signOptions: { expiresIn: '10min' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
