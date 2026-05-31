"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransaksiService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let TransaksiService = class TransaksiService {
    prisma = new client_1.PrismaClient();
    async create(data) {
        const customer = await this.prisma.customer.findUnique({
            where: {
                id: data.customerId,
            },
        });
        if (!customer) {
            throw new common_1.NotFoundException('Customer tidak ditemukan');
        }
        const menu = await this.prisma.menu.findUnique({
            where: {
                id: data.menuId,
            },
        });
        if (!menu) {
            throw new common_1.NotFoundException('Menu tidak ditemukan');
        }
        if (menu.stok < data.jumlah) {
            throw new common_1.BadRequestException('Stok tidak mencukupi');
        }
        const totalHarga = menu.harga * data.jumlah;
        const transaksi = await this.prisma.transaksi.create({
            data: {
                customerId: data.customerId,
                menuId: data.menuId,
                jumlah: data.jumlah,
                totalHarga,
            },
            include: {
                customer: true,
                menu: true,
            },
        });
        await this.prisma.menu.update({
            where: {
                id: menu.id,
            },
            data: {
                stok: menu.stok - data.jumlah,
            },
        });
        return transaksi;
    }
    async findAll() {
        return this.prisma.transaksi.findMany({
            include: {
                customer: true,
                menu: true,
            },
            orderBy: {
                id: 'desc',
            },
        });
    }
    async findOne(id) {
        const transaksi = await this.prisma.transaksi.findUnique({
            where: { id },
            include: {
                customer: true,
                menu: true,
            },
        });
        if (!transaksi) {
            throw new common_1.NotFoundException('Transaksi tidak ditemukan');
        }
        return transaksi;
    }
    async updateStatus(id, status) {
        await this.findOne(id);
        return this.prisma.transaksi.update({
            where: { id },
            data: { status },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.transaksi.delete({
            where: { id },
        });
    }
};
exports.TransaksiService = TransaksiService;
exports.TransaksiService = TransaksiService = __decorate([
    (0, common_1.Injectable)()
], TransaksiService);
//# sourceMappingURL=transaksi.service.js.map