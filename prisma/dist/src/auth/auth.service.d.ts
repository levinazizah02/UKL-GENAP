import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    private prisma;
    constructor(jwtService: JwtService);
    register(data: any): Promise<{
        message: string;
        data: {
            id: number;
            username: string;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    login(data: any): Promise<{
        access_token: string;
    }>;
}
