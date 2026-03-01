import { Module } from '@nestjs/common';
import { CatalogsService } from './services/catalogs.service';
import { CatalogsController } from './controllers/catalogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catalog } from './entities/catalog.entity';

@Module({
  controllers: [CatalogsController],
  providers: [CatalogsService],
  imports: [TypeOrmModule.forFeature([Catalog])],
  exports: [CatalogsModule],
})
export class CatalogsModule {}
