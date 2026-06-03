import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CustomerService {
  private prisma = new PrismaClient();

  async create(data: any) {
    return this.prisma.customer.create({
      data: {
        nama: data.nama,
        noHp: data.noHp,
        alamat: data.alamat,
        userId: data.userId,
      },
    });
  }

  async findAll() {
    return this.prisma.customer.findMany({
      include: { transaksi: true },
    });
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: { transaksi: true },
    });
    if (!customer) throw new NotFoundException('Customer tidak ditemukan');
    return customer;
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.customer.delete({ where: { id } });
  }
}
