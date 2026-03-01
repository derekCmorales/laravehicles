import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatalogsService } from '../services/catalogs.service';
import { CreateCatalogDto, UpdateCatalogDto } from '../dto/catalog.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { Role } from '../../auth/models/role.enum';

@Auth(Role.Admin)
@Controller('catalogs')
export class CatalogsController {
  constructor(private readonly catalogsService: CatalogsService) {}

  @Post()
  create(@Body() createCatalogDto: CreateCatalogDto) {
    return this.catalogsService.create(createCatalogDto);
  }

  @Get()
  findAll() {
    return this.catalogsService.findAll();
  }

  @Get(':codigoISCV')
  findOne(@Param('codigoISCV') codigoISCV: string) {
    return this.catalogsService.findOne(codigoISCV);
  }

  @Patch(':codigoISCV')
  update(@Param('codigoISCV') codigoISCV: string, @Body() updateCatalogDto: UpdateCatalogDto) {
    return this.catalogsService.update(codigoISCV, updateCatalogDto);
  }

  @Delete(':codigoISCV')
  remove(@Param('codigoISCV') codigoISCV: string) {
    return this.catalogsService.remove(codigoISCV);
  }
}
