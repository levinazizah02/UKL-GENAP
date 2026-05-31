import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  "nama": string;

  @IsInt()
  @Min(0)
  "harga": number;

  @IsString()
  @IsNotEmpty()
  "kategori": string;

  @IsInt()
  @Min(0)
  "stok": number;
}