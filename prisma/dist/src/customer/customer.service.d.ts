export declare class CustomerService {
    private prisma;
    create(data: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        alamat: string;
        noHp: string;
    }>;
    findAll(): Promise<({
        transaksi: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            jumlah: number;
            totalHarga: number;
            status: import("@prisma/client").$Enums.StatusTransaksi;
            customerId: number;
            menuId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        alamat: string;
        noHp: string;
    })[]>;
    findOne(id: number): Promise<{
        transaksi: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            jumlah: number;
            totalHarga: number;
            status: import("@prisma/client").$Enums.StatusTransaksi;
            customerId: number;
            menuId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        alamat: string;
        noHp: string;
    }>;
    update(id: number, data: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        alamat: string;
        noHp: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        alamat: string;
        noHp: string;
    }>;
}
