import { StatusTransaksi } from '@prisma/client';
export declare class TransaksiService {
    private prisma;
    create(data: any): Promise<{
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
    findOne(id: number): Promise<{
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
    updateStatus(id: number, status: StatusTransaksi): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        jumlah: number;
        totalHarga: number;
        status: import("@prisma/client").$Enums.StatusTransaksi;
        customerId: number;
        menuId: number;
    }>;
    remove(id: number): Promise<{
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
