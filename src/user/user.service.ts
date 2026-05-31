import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  private prisma = new PrismaClient();

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(
        'User tidak ditemukan',
      );
    }

    return user;
  }

 async update(id: number, data: any) {
  await this.findOne(id);

  return this.prisma.user.update({
    where: { id },
    data: data,
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
    },
  });
}

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }
}