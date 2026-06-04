import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ example: 'Nasi Goreng', description: 'Nama menu' })
  @IsString()
  @IsNotEmpty()
  nama!: string;

  @ApiProperty({ example: 15000, description: 'Harga menu' })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  harga!: number;

  @ApiProperty({ example: 'Makanan', description: 'Kategori menu' })
  @IsString()
  @IsNotEmpty()
  kategori!: string;

  @ApiProperty({ example: 10, description: 'Stok menu' })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  stok!: number;

  @ApiPropertyOptional({ description: 'URL gambar menu (diisi otomatis)' })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}