import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaClient, StatusPesanan } from '@prisma/client';

@Injectable()
export class TransaksiService {
  private prisma = new PrismaClient();

  async create(data: any) {
    const customer = await this.prisma.customer.findUnique({ where: { id: data.customerId } });
    if (!customer) throw new NotFoundException('Customer tidak ditemukan');

    const menu = await this.prisma.menu.findUnique({ where: { id: data.menuId } });
    if (!menu) throw new NotFoundException('Menu tidak ditemukan');
    if (menu.stok < data.jumlah) throw new BadRequestException('Stok tidak mencukupi');

    const totalHarga = menu.harga * data.jumlah;

    const transaksi = await this.prisma.transaksi.create({
      data: {
        customerId: data.customerId,
        totalHarga,
        items: {
          create: [{
            menuId: data.menuId,
            jumlah: data.jumlah,
            hargaSatuan: menu.harga,
          }],
        },
      },
      include: {
        customer: true,
        items: { include: { menu: true } },
      },
    });

    await this.prisma.menu.update({
      where: { id: menu.id },
      data: { stok: menu.stok - data.jumlah },
    });

    return transaksi;
  }

  async findAll() {
    return this.prisma.transaksi.findMany({
      include: { customer: true, items: { include: { menu: true } } },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const transaksi = await this.prisma.transaksi.findUnique({
      where: { id },
      include: { customer: true, items: { include: { menu: true } } },
    });
    if (!transaksi) throw new NotFoundException('Transaksi tidak ditemukan');
    return transaksi;
  }

  async updateStatus(id: number, status: string) {
    await this.findOne(id);
    return this.prisma.transaksi.update({
      where: { id },
      data: { status: status as StatusPesanan },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.transaksi.delete({ where: { id } });
  }
}
