import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { MenuModule } from './menu/menu.module';
import { TransaksiModule } from './transaksi/transaksi.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    CustomerModule,
    MenuModule,
    TransaksiModule,
  ],
})
export class AppModule {}