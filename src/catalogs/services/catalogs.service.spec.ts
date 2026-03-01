import { Test, TestingModule } from '@nestjs/testing';
import { CatalogsService } from '../services/catalogs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Catalog } from '../entities/catalog.entity';

describe('CatalogsService', () => {
  let service: CatalogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogsService,
        {
          provide: getRepositoryToken(Catalog),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CatalogsService>(CatalogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
