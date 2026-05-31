"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let MenuService = class MenuService {
    prisma = new client_1.PrismaClient();
    async create(data) {
        return this.prisma.menu.create({
            data,
        });
    }
    async findAll() {
        return this.prisma.menu.findMany({
            orderBy: {
                id: 'asc',
            },
        });
    }
    async findOne(id) {
        const menu = await this.prisma.menu.findUnique({
            where: { id },
        });
        if (!menu) {
            throw new common_1.NotFoundException('Menu tidak ditemukan');
        }
        return menu;
    }
    async update(id, data) {
        await this.findOne(id);
        return this.prisma.menu.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.menu.delete({
            where: { id },
        });
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)()
], MenuService);
//# sourceMappingURL=menu.service.js.map