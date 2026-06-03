import { IsEnum } from 'class-validator';

export class UpdateStatusDto {
  @IsEnum(['PENDING', 'DIPROSES', 'SELESAI', 'DIBATALKAN'])
  status!: string;
}
