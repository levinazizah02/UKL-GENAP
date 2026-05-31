"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.menu.deleteMany();
    await prisma.menu.createMany({
        data: [
            {
                nama: 'Bakso Malang',
                harga: 15000,
                kategori: 'Makanan',
                stok: 50,
            },
            {
                nama: 'Soto Ayam Lamongan',
                harga: 16000,
                kategori: 'Makanan',
                stok: 40,
            },
            {
                nama: 'Rawon Daging',
                harga: 18000,
                kategori: 'Makanan',
                stok: 30,
            },
            {
                nama: 'Es Teh Manis',
                harga: 5000,
                kategori: 'Minuman',
                stok: 100,
            },
            {
                nama: 'Es Jeruk Peras',
                harga: 7000,
                kategori: 'Minuman',
                stok: 80,
            },
        ],
    });
    console.log('Menu berhasil ditambahkan');
}
main()
    .catch((e) => {
    console.error(e);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map