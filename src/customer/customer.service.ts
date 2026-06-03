import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCustomerDto) {
    // Cek duplikasi userId
    const existing = await this.prisma.customer.findUnique({
      where: { userId: dto.userId },
    });
    if (existing) {
      throw new ConflictException(
        'Customer dengan userId ini sudah ada',
      );
    }

    return this.prisma.customer.create({
      data: {
        nama: dto.nama,
        noHp: dto.noHp,
        alamat: dto.alamat,
        userId: dto.userId,
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
    if (!customer)
      throw new NotFoundException('Customer tidak ditemukan');
    return customer;
  }

  async update(id: number, dto: UpdateCustomerDto) {
    await this.findOne(id);
    return this.prisma.customer.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.customer.delete({ where: { id } });
  }
}