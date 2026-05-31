"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.menu.createMany({
        data: [
            {
                nama: 'Nasi Goreng',
                harga: 15000,
                kategori: 'Makanan',
                stok: 50,
            },
            {
                nama: 'Mie Ayam',
                harga: 12000,
                kategori: 'Makanan',
                stok: 50,
            },
            {
                nama: 'Ayam Geprek',
                harga: 18000,
                kategori: 'Makanan',
                stok: 50,
            },
            {
                nama: 'Es Teh',
                harga: 5000,
                kategori: 'Minuman',
                stok: 100,
            },
            {
                nama: 'Es Jeruk',
                harga: 7000,
                kategori: 'Minuman',
                stok: 100,
            },
        ],
    });
    console.log('Seed berhasil');
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=prisma.seed.js.map