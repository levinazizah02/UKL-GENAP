import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { MenuModule } from './menu/menu.module';
import { TransaksiModule } from './transaksi/transaksi.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  controllers: [AppController],
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    CustomerModule,
    MenuModule,
    TransaksiModule,
    CloudinaryModule,
  ],
  providers: [AppService],
})
export class AppModule {}