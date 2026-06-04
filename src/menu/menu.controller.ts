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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { RolesGuard } from '../auth/roles.guard';   // ← tambah import
import { Roles } from '../auth/roles.decorator';


@ApiTags('Menu')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
@Controller('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
  ) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Tambah menu baru' })
  @ApiResponse({ status: 201, description: 'Menu berhasil ditambahkan' })
  create(@Body() dto: CreateMenuDto) {
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
  @ApiOperation({ summary: 'Update menu by ID' })
  @ApiResponse({ status: 200, description: 'Menu berhasil diupdate' })
  @ApiResponse({ status: 404, description: 'Menu tidak ditemukan' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMenuDto,
  ) {
    return this.menuService.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus menu by ID' })
  @ApiResponse({ status: 200, description: 'Menu berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Menu tidak ditemukan' })
  remove(@Param('id') id: string) {
    return this.menuService.remove(Number(id));
  }
}