import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Budi Santoso', description: 'Nama customer' })
  @IsString()
  @IsNotEmpty()
  nama!: string;

  @ApiProperty({ example: 'Jl. Merdeka No. 1', description: 'Alamat customer' })
  @IsString()
  @IsNotEmpty()
  alamat!: string;

  @ApiProperty({ example: '08123456789', description: 'Nomor HP customer' })
  @IsString()
  @IsNotEmpty()
  noHp!: string;

  @ApiProperty({ example: 1, description: 'ID user yang terhubung' })
  @IsNumber()
  @IsNotEmpty()
  userId!: number;
}