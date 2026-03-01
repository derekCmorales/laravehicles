import { Module } from '@nestjs/common';
import { VehiclesService } from './services/vehicles.service';
import { VehiclesController } from './controllers/vehicles.controller';
import { CatalogsModule } from 'src/catalogs/catalogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { UsersModule } from 'src/users/users.module';
import { VehicleRegistration } from './entities/vehicleRegistration.entity';
import { VehicleDecal } from './entities/vehicleDecal.entity';
import { PropertyCertificate } from './entities/propertyCertificate.entity';
import { Catalog } from '../catalogs/entities/catalog.entity';
import { Taxpayer } from '../users/entities/taxpayer.entity';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService],
  imports: [TypeOrmModule.forFeature([Vehicle, VehicleRegistration, VehicleDecal, PropertyCertificate, Catalog, Taxpayer]), CatalogsModule, UsersModule],
  exports: [VehiclesModule],
})
export class VehiclesModule {}
