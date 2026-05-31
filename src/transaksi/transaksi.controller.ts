import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { TransaksiService } from './transaksi.service';

import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('transaksi')
export class TransaksiController {
  constructor(
    private readonly transaksiService: TransaksiService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateTransaksiDto,
  ) {
    return this.transaksiService.create(dto);
  }

  @Get()
  findAll() {
    return this.transaksiService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.transaksiService.findOne(
      Number(id),
    );
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.transaksiService.updateStatus(
      Number(id),
      dto.status,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.transaksiService.remove(
      Number(id),
    );
  }
}