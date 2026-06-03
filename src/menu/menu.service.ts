import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMenuDto) {
    return this.prisma.menu.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.menu.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
    });
    if (!menu) throw new NotFoundException('Menu tidak ditemukan');
    return menu;
  }

  async update(id: number, dto: UpdateMenuDto) {
    await this.findOne(id);
    return this.prisma.menu.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.menu.delete({ where: { id } });
  }
}