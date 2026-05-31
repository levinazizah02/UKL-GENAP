import { IsInt, Min } from 'class-validator';

export class CreateTransaksiDto {
  @IsInt()
  "customerId": number;

  @IsInt()
  "menuId": number;

  @IsInt()
  @Min(1)
  "jumlah": number;
}