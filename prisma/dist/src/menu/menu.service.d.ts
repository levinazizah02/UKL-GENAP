export declare class MenuService {
    private prisma;
    create(data: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        harga: number;
        kategori: string;
        stok: number;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        harga: number;
        kategori: string;
        stok: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        harga: number;
        kategori: string;
        stok: number;
    }>;
    update(id: number, data: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        harga: number;
        kategori: string;
        stok: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        harga: number;
        kategori: string;
        stok: number;
    }>;
}
