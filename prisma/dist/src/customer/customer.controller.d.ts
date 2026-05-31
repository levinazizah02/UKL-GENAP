import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(dto: CreateCustomerDto): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, dto: UpdateCustomerDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        alamat: string;
        noHp: string;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama: string;
        alamat: string;
        noHp: string;
    }>;
}
