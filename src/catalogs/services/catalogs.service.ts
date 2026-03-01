import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatalogDto, UpdateCatalogDto } from '../dto/catalog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalog } from '../entities/catalog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatalogsService {
  constructor(
    @InjectRepository(Catalog)
    private catalogsRepository: Repository<Catalog>,
  ) {}

  async create(payload: CreateCatalogDto) {
    const existingCatalog = await this.catalogsRepository.findOne({ where: { codigoISCV: payload.codigoISCV } });
    if (existingCatalog) {
      throw new BadRequestException('Codigo ISCV ya existe');
    }

    const catalog = this.catalogsRepository.create(payload);
    return this.catalogsRepository.save(catalog);
  }

  findAll() {
    return this.catalogsRepository.find();
  }

  async findOne(codigoISCV: string) {
    const catalog = await this.catalogsRepository.findOne({ where: { codigoISCV } });
    if (!catalog) {
      throw new NotFoundException('Catalog not found');
    }
    return catalog;
  }

  async update(codigoISCV: string, payload: UpdateCatalogDto) {
    const catalog = await this.findOne(codigoISCV);
    this.catalogsRepository.merge(catalog, payload);
    return this.catalogsRepository.save(catalog);
  }

  async remove(codigoISCV: string) {
    const catalog = await this.findOne(codigoISCV);
    return this.catalogsRepository.remove(catalog);
  }
}
