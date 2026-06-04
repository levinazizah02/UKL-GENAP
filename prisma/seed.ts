import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Seed admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });
  console.log('Admin berhasil dibuat');

  // Seed menu
  await prisma.menu.deleteMany();
  await prisma.menu.createMany({
    data: [
      { nama: 'Bakso Malang', harga: 15000, kategori: 'Makanan', stok: 50 },
      { nama: 'Soto Ayam Lamongan', harga: 16000, kategori: 'Makanan', stok: 40 },
      { nama: 'Rawon Daging', harga: 18000, kategori: 'Makanan', stok: 30 },
      { nama: 'Es Teh Manis', harga: 5000, kategori: 'Minuman', stok: 100 },
      { nama: 'Es Jeruk Peras', harga: 7000, kategori: 'Minuman', stok: 80 },
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