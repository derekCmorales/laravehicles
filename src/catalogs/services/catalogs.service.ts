import { Injectable } from '@nestjs/common';
import { CreateCatalogDto, UpdateCatalogDto } from '../dto/catalog.dto';

@Injectable()
export class CatalogsService {
  create(_createCatalogDto: CreateCatalogDto) {
    void _createCatalogDto;
    return 'This action adds a new catalog';
  }

  findAll() {
    return `This action returns all catalogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catalog`;
  }

  update(id: number, _updateCatalogDto: UpdateCatalogDto) {
    void _updateCatalogDto;
    return `This action updates a #${id} catalog`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalog`;
  }
}
