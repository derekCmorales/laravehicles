import { Test, TestingModule } from '@nestjs/testing';
import { CatalogsController } from './catalogs.controller';
import { CatalogsService } from '../services/catalogs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Catalog } from '../entities/catalog.entity';

describe('CatalogsController', () => {
  let controller: CatalogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogsController],
      providers: [
        CatalogsService,
        {
          provide: getRepositoryToken(Catalog),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CatalogsController>(CatalogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
