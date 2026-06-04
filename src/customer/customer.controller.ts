import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { RolesGuard } from '../auth/guards/roles.guard';   // ← tambah import
import { Roles } from '../auth/decorators/roles.decorator'; 
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Customer')
@ApiBearerAuth()
@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
  ) {}
  
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN') 
  @ApiOperation({ summary: 'Buat customer baru' })
  @ApiResponse({ status: 201, description: 'Customer berhasil dibuat' })
  create(@Body() dto: CreateCustomerDto) {
    return this.customerService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Ambil semua customer' })
  @ApiResponse({ status: 200, description: 'List semua customer' })
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil customer by ID' })
  @ApiResponse({ status: 200, description: 'Data customer ditemukan' })
  @ApiResponse({ status: 404, description: 'Customer tidak ditemukan' })
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update customer by ID' })
  @ApiResponse({ status: 200, description: 'Customer berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Customer tidak ditemukan' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customerService.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus customer by ID' })
  @ApiResponse({ status: 200, description: 'Customer berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Customer tidak ditemukan' })
  remove(@Param('id') id: string) {
    return this.customerService.remove(Number(id));
  }
}