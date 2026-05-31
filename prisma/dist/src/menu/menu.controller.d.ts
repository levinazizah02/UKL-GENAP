import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(dto: CreateMenuDto): Promise<{
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
    findOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        harga: number;
        kategori: string;
        stok: number;
    }>;
    update(id: string, dto: UpdateMenuDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        harga: number;
        kategori: string;
        stok: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        harga: number;
        kategori: string;
        stok: number;
    }>;
}
