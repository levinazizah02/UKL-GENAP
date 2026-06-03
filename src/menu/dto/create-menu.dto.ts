import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ example: 'Nasi Goreng', description: 'Nama menu' })
  @IsString()
  @IsNotEmpty()
  nama!: string;

  @ApiProperty({ example: 15000.5, description: 'Harga menu' })
  @IsNumber()
  @Min(0)
  harga!: number;

  @ApiProperty({ example: 'Makanan', description: 'Kategori menu' })
  @IsString()
  @IsNotEmpty()
  kategori!: string;

  @ApiProperty({ example: 10, description: 'Stok menu' })
  @IsInt()
  @Min(0)
  stok!: number;
}