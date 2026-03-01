import { Module } from '@nestjs/common';
import { CatalogsService } from './services/catalogs.service';
import { CatalogsController } from './controllers/catalogs.controller';

@Module({
  controllers: [CatalogsController],
  providers: [CatalogsService],
})
export class CatalogsModule {}
