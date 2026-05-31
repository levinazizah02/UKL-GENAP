import { IsEnum } from 'class-validator';
import { StatusTransaksi } from '@prisma/client';

export class UpdateStatusDto {
  @IsEnum(StatusTransaksi)
  "status": StatusTransaksi;
}