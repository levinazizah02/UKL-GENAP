import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { StatusPesanan } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class TransaksiService {
  private readonly logger = new Logger(TransaksiService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTransaksiDto) {
    return this.prisma.$transaction(async (tx) => {
      // Validasi customer
      const customer = await tx.customer.findUnique({
        where: { id: dto.customerId },
      });
      if (!customer) {
        throw new NotFoundException(
          `Customer dengan id ${dto.customerId} tidak ditemukan`,
        );
      }

      // Validasi menu & stok
      const menu = await tx.menu.findUnique({
        where: { id: dto.menuId },
      });
      if (!menu) {
        throw new NotFoundException(
          `Menu dengan id ${dto.menuId} tidak ditemukan`,
        );
      }
      if (menu.stok < dto.jumlah) {
        throw new BadRequestException(
          `Stok tidak mencukupi. Stok tersedia: ${menu.stok}, diminta: ${dto.jumlah}`,
        );
      }

      const totalHarga = menu.harga * dto.jumlah;

      // Buat transaksi beserta items-nya
      const transaksi = await tx.transaksi.create({
        data: {
          customerId: dto.customerId,
          totalHarga,
          items: {
            create: [
              {
                menuId: dto.menuId,
                jumlah: dto.jumlah,
                hargaSatuan: menu.harga,
              },
            ],
          },
        },
        include: {
          customer: true,
          items: { include: { menu: true } },
        },
      });

      // Kurangi stok menu secara atomik
      await tx.menu.update({
        where: { id: menu.id },
        data: { stok: { decrement: dto.jumlah } },
      });

      this.logger.log(
        `Transaksi #${transaksi.id} berhasil dibuat untuk customer ${customer.nama}`,
      );

      return transaksi;
    }, {timeout: 30000});
  }

  async findAll() {
    return this.prisma.transaksi.findMany({
      include: {
        customer: true,
        items: { include: { menu: true } },
      },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const transaksi = await this.prisma.transaksi.findUnique({
      where: { id },
      include: {
        customer: true,
        items: { include: { menu: true } },
      },
    });

    if (!transaksi) {
      throw new NotFoundException(`Transaksi dengan id ${id} tidak ditemukan`);
    }

    return transaksi;
  }

  async updateStatus(id: number, dto: UpdateStatusDto) {
    await this.findOne(id); // validasi transaksi ada

    const updated = await this.prisma.transaksi.update({
      where: { id },
      data: { status: dto.status as StatusPesanan },
      include: {
        customer: true,
        items: { include: { menu: true } },
      },
    });

    this.logger.log(`Status transaksi #${id} diubah menjadi ${dto.status}`);

    return updated;
  }

  async remove(id: number) {
    await this.findOne(id); // validasi transaksi ada

    await this.prisma.transaksi.delete({ where: { id } });

    this.logger.log(`Transaksi #${id} dihapus`);

    return { message: `Transaksi #${id} berhasil dihapus` };
  }
}