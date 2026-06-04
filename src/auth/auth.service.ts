import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const existing =
      await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

    if (existing) {
      throw new BadRequestException(
        'Email sudah digunakan',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        data.password,
        10,
      );

    const newUser =
      await this.prisma.user.create({
        data: {
          username: data.username,
          email: data.email,
          password: hashedPassword,
          role: Role.CUSTOMER,
        },
      });

    const { password, ...safeUser } =
      newUser;

    return {
      message: 'Register berhasil',
      data: safeUser,
    };
  }

  async login(data: LoginDto) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

    if (!user) {
      throw new UnauthorizedException(
        'Email tidak ditemukan',
      );
    }

    const validPassword =
      await bcrypt.compare(
        data.password,
        user.password,
      );

    if (!validPassword) {
      throw new UnauthorizedException(
        'Password salah',
      );
    }

    const token =
      this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.role,
      });

    return {
      access_token: token,
    };
  }
}