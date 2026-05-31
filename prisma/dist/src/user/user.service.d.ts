export declare class UserService {
    private prisma;
    findAll(): Promise<{
        id: number;
        username: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        username: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
    update(id: number, data: any): Promise<{
        id: number;
        username: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    remove(id: number): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
