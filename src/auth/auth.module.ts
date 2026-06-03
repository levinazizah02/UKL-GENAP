import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'default-secret-ganti-di-env',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService],
})
export class AuthModule {}