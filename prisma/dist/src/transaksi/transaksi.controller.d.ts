import { TransaksiService } from './transaksi.service';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
export declare class TransaksiController {
    private readonly transaksiService;
    constructor(transaksiService: TransaksiService);
    create(dto: CreateTransaksiDto): Promise<{
        customer: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nama: string;
            alamat: string;
            noHp: string;
        };
        menu: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nama: string;
            harga: number;
            kategori: string;
            stok: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jumlah: number;
        totalHarga: number;
        status: import("@prisma/client").$Enums.StatusTransaksi;
        customerId: number;
        menuId: number;
    }>;
    findAll(): Promise<({
        customer: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nama: string;
            alamat: string;
            noHp: string;
        };
        menu: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nama: string;
            harga: number;
            kategori: string;
            stok: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jumlah: number;
        totalHarga: number;
        status: import("@prisma/client").$Enums.StatusTransaksi;
        customerId: number;
        menuId: number;
    })[]>;
    findOne(id: string): Promise<{
        customer: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nama: string;
            alamat: string;
            noHp: string;
        };
        menu: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            nama: string;
            harga: number;
            kategori: string;
            stok: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jumlah: number;
        totalHarga: number;
        status: import("@prisma/client").$Enums.StatusTransaksi;
        customerId: number;
        menuId: number;
    }>;
    updateStatus(id: string, dto: UpdateStatusDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jumlah: number;
        totalHarga: number;
        status: import("@prisma/client").$Enums.StatusTransaksi;
        customerId: number;
        menuId: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jumlah: number;
        totalHarga: number;
        status: import("@prisma/client").$Enums.StatusTransaksi;
        customerId: number;
        menuId: number;
    }>;
}
