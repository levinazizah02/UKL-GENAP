import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class MenuService {
  private prisma = new PrismaClient();

  async create(data: any) {
    return this.prisma.menu.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.menu.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
    });

    if (!menu) {
      throw new NotFoundException(
        'Menu tidak ditemukan',
      );
    }

    return menu;
  }

  async update(id: number, data: any) {
    await this.findOne(id);

    return this.prisma.menu.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.menu.delete({
      where: { id },
    });
  }
}