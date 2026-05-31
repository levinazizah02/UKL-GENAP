import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  "nama": string;

  @IsString()
  @IsNotEmpty()
  "alamat": string;

  @IsString()
  @IsNotEmpty()
  "noHp": string;
}