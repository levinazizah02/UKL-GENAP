import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import 'multer'

@ApiTags('Menu')
@ApiBearerAuth()
@Controller('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

@Post()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@UseInterceptors(FileInterceptor('file'))
@ApiConsumes('multipart/form-data')
@ApiOperation({ summary: 'Tambah menu baru' })
@ApiBody({
  schema: {
    type: 'object',
    required: ['nama', 'harga', 'kategori', 'stok'],
    properties: {
      nama:     { type: 'string', example: 'Nasi Goreng' },
      harga:    { type: 'number', example: 15000 },
      kategori: { type: 'string', example: 'Makanan' },
      stok:     { type: 'number', example: 10 },
      file:     { type: 'string', format: 'binary', description: 'Gambar menu (opsional)' },
    },
  },
})
@ApiResponse({ status: 201, description: 'Menu berhasil ditambahkan' })
async create(
  @Body() dto: CreateMenuDto,
  @UploadedFile() file?: Express.Multer.File,
) {
  if (file) {
    const uploaded = await this.cloudinaryService.uploadImage(file);
    dto.imageUrl = uploaded.secure_url;
  }
  return this.menuService.create(dto);
}

  @Get()
  @ApiOperation({ summary: 'Ambil semua menu' })
  @ApiResponse({ status: 200, description: 'List semua menu' })
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil menu by ID' })
  @ApiResponse({ status: 200, description: 'Data menu ditemukan' })
  @ApiResponse({ status: 404, description: 'Menu tidak ditemukan' })
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(Number(id));
  }

@Patch(':id')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@UseInterceptors(FileInterceptor('file'))
@ApiConsumes('multipart/form-data')
@ApiOperation({ summary: 'Update menu by ID' })
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      nama:     { type: 'string', example: 'Nasi Goreng' },
      harga:    { type: 'number', example: 15000 },
      kategori: { type: 'string', example: 'Makanan' },
      stok:     { type: 'number', example: 10 },
      file:     { type: 'string', format: 'binary', description: 'Gambar menu baru (opsional)' },
    },
  },
})
@ApiResponse({ status: 200, description: 'Menu berhasil diupdate' })
@ApiResponse({ status: 404, description: 'Menu tidak ditemukan' })
async update(
  @Param('id') id: string,
  @Body() dto: UpdateMenuDto,
  @UploadedFile() file?: Express.Multer.File,
) {
  if (file) {
    const uploaded = await this.cloudinaryService.uploadImage(file);
    dto.imageUrl = uploaded.secure_url;
  }
  return this.menuService.update(Number(id), dto);
}

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Hapus menu by ID' })
  @ApiResponse({ status: 200, description: 'Menu berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Menu tidak ditemukan' })
  remove(@Param('id') id: string) {
    return this.menuService.remove(Number(id));
  }
}