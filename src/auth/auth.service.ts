import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();
  constructor(private jwtService: JwtService) {}

  async register(data: any) {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (user) throw new BadRequestException('Email sudah digunakan');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
    return { message: 'Register berhasil', data: newUser };
  }

  async login(data: any) {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw new UnauthorizedException('Email tidak ditemukan');

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) throw new UnauthorizedException('Password salah');

    const token = this.jwtService.sign({ id: user.id, email: user.email, role: user.role });
    return { access_token: token };
  }
}
