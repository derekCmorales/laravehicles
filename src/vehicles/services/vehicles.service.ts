import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehicleWithPropertyRegistrationDto, UpdateVehicleWithPropertyRegistrationDto } from '../dto/vehicle.dto';
import { EstadoVehiculo, Vehicle } from '../entities/vehicle.entity';
import { Catalog } from '../../catalogs/entities/catalog.entity';
import { Taxpayer } from '../../users/entities/taxpayer.entity';
import { Role } from '../../auth/models/role.enum';
import { PropertyCertificate } from '../entities/propertyCertificate.entity';
import { VehicleRegistration } from '../entities/vehicleRegistration.entity';

type AuthUser = { role?: Role; sub?: number | string };

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
    @InjectRepository(PropertyCertificate)
    private propertyCertificatesRepository: Repository<PropertyCertificate>,
    @InjectRepository(VehicleRegistration)
    private vehicleRegistrationsRepository: Repository<VehicleRegistration>,
    @InjectRepository(Catalog)
    private catalogsRepository: Repository<Catalog>,
    @InjectRepository(Taxpayer)
    private taxpayersRepository: Repository<Taxpayer>,
  ) {}

  async CreateVehicleWithPropertyRegistration(payload: CreateVehicleWithPropertyRegistrationDto) {
    const existingVehicle = await this.vehiclesRepository
      .createQueryBuilder('vehicle')
      .where('vehicle.placa = :placa', { placa: payload.placa })
      .orWhere('vehicle.codigo_unico_identificador = :codigoUnicoIdentificador', {
        codigoUnicoIdentificador: payload.codigoUnicoIdentificador,
      })
      .orWhere('vehicle.vin = :vin', { vin: payload.vin })
      .getOne();

    if (existingVehicle) {
      throw new BadRequestException('Vehiculo ya existe');
    }

    const catalog = await this.catalogsRepository.findOne({ where: { codigoISCV: payload.codigoISCV } });
    if (!catalog) {
      throw new NotFoundException('Catalog not found');
    }

    const taxpayer = await this.taxpayersRepository.findOne({ where: { NIT: payload.nit } });
    if (!taxpayer) {
      throw new NotFoundException('Taxpayer not found');
    }

    const vehicle = this.vehiclesRepository.create({
      placa: payload.placa,
      codigoUnicoIdentificador: payload.codigoUnicoIdentificador,
      uso: payload.uso,
      modelo: payload.modelo,
      vin: payload.vin,
      serie: payload.serie,
      chasis: payload.chasis,
      motor: payload.motor,
      centimetrosCubicos: payload.centimetrosCubicos,
      asientos: payload.asientos,
      cilindros: payload.cilindros,
      combustible: payload.combustible,
      puertas: payload.puertas,
      tonelaje: payload.tonelaje,
      color: payload.color,
      ejes: payload.ejes,
      catalog,
      taxpayer,
    });

    const savedVehicle = await this.vehiclesRepository.save(vehicle);

    const propertyCertificate = this.propertyCertificatesRepository.create({
      noCertificado: payload.propertyCertificate.noCertificado,
      codigoUnicoIdentificador: payload.propertyCertificate.codigoUnicoIdentificador,
      fechaEmision: payload.propertyCertificate.fechaEmision,
      aduanaLiquidadora: payload.propertyCertificate.aduanaLiquidadora,
      polizaImportacion: payload.propertyCertificate.polizaImportacion,
      fechaPoliza: payload.propertyCertificate.fechaPoliza,
      franquiciaNo: payload.propertyCertificate.franquiciaNo,
      vehicle: savedVehicle,
    });

    const vehicleRegistration = this.vehicleRegistrationsRepository.create({
      noTarjeta: payload.vehicleRegistration.noTarjeta,
      fechaRegistro: payload.vehicleRegistration.fechaRegistro,
      aduanaLiquidadora: payload.vehicleRegistration.aduanaLiquidadora,
      validaHasta: payload.vehicleRegistration.validaHasta,
      vehicle: savedVehicle,
    });

    await this.propertyCertificatesRepository.save(propertyCertificate);
    await this.vehicleRegistrationsRepository.save(vehicleRegistration);

    return this.vehiclesRepository.findOne({
      where: { placa: savedVehicle.placa },
      relations: ['catalog', 'taxpayer', 'propertyCertificates', 'vehicleRegistrations'],
    });
  }

  async findAllVehicles(user?: AuthUser) {
    if (user?.role === Role.Admin) {
      return this.vehiclesRepository.find({ relations: ['catalog', 'taxpayer'] });
    }

    const nit = await this.getNitByUser(user);
    return this.vehiclesRepository.find({ where: { taxpayer: { NIT: nit } }, relations: ['catalog', 'taxpayer'] });
  }

  async findOneVehicle(placa: string, user?: AuthUser) {
    const vehicle = await this.vehiclesRepository.findOne({ where: { placa }, relations: ['catalog', 'taxpayer'] });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    if (user?.role === Role.Admin) {
      return vehicle;
    }

    const nit = await this.getNitByUser(user);
    if (vehicle.taxpayer?.NIT !== nit) {
      throw new ForbiddenException('Vehicle not assigned to user');
    }

    return vehicle;
  }

  async updateVehicleWithPropertyRegistration(placa: string, payload: UpdateVehicleWithPropertyRegistrationDto) {
    const vehicle = await this.vehiclesRepository.findOne({
      where: { placa },
      relations: ['catalog', 'taxpayer', 'propertyCertificates', 'vehicleRegistrations'],
    });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    if (payload.codigoISCV) {
      const catalog = await this.catalogsRepository.findOne({ where: { codigoISCV: payload.codigoISCV } });
      if (!catalog) {
        throw new NotFoundException('Catalog not found');
      }
      vehicle.catalog = catalog;
    }

    if (payload.nit) {
      const taxpayer = await this.taxpayersRepository.findOne({ where: { NIT: payload.nit } });
      if (!taxpayer) {
        throw new NotFoundException('Taxpayer not found');
      }
      vehicle.taxpayer = taxpayer;
    }

    this.vehiclesRepository.merge(vehicle, {
      codigoUnicoIdentificador: payload.codigoUnicoIdentificador,
      uso: payload.uso,
      estado: payload.estado,
      modelo: payload.modelo,
      vin: payload.vin,
      serie: payload.serie,
      chasis: payload.chasis,
      motor: payload.motor,
      centimetrosCubicos: payload.centimetrosCubicos,
      asientos: payload.asientos,
      cilindros: payload.cilindros,
      combustible: payload.combustible,
      puertas: payload.puertas,
      tonelaje: payload.tonelaje,
      color: payload.color,
      ejes: payload.ejes,
    });

    const updatedVehicle = await this.vehiclesRepository.save(vehicle);

    if (payload.propertyCertificate) {
      const propertyCertificate = vehicle.propertyCertificates?.[0]
        ? this.propertyCertificatesRepository.merge(vehicle.propertyCertificates[0], {
            noCertificado: payload.propertyCertificate.noCertificado,
            codigoUnicoIdentificador: payload.propertyCertificate.codigoUnicoIdentificador,
            fechaEmision: payload.propertyCertificate.fechaEmision,
            aduanaLiquidadora: payload.propertyCertificate.aduanaLiquidadora,
            polizaImportacion: payload.propertyCertificate.polizaImportacion,
            fechaPoliza: payload.propertyCertificate.fechaPoliza,
            franquiciaNo: payload.propertyCertificate.franquiciaNo,
          })
        : this.propertyCertificatesRepository.create({
            noCertificado: payload.propertyCertificate.noCertificado,
            codigoUnicoIdentificador: payload.propertyCertificate.codigoUnicoIdentificador,
            fechaEmision: payload.propertyCertificate.fechaEmision,
            aduanaLiquidadora: payload.propertyCertificate.aduanaLiquidadora,
            polizaImportacion: payload.propertyCertificate.polizaImportacion,
            fechaPoliza: payload.propertyCertificate.fechaPoliza,
            franquiciaNo: payload.propertyCertificate.franquiciaNo,
            vehicle: updatedVehicle,
          });

      await this.propertyCertificatesRepository.save(propertyCertificate);
    }

    if (payload.vehicleRegistration) {
      const vehicleRegistration = vehicle.vehicleRegistrations?.[0]
        ? this.vehicleRegistrationsRepository.merge(vehicle.vehicleRegistrations[0], {
            noTarjeta: payload.vehicleRegistration.noTarjeta,
            fechaRegistro: payload.vehicleRegistration.fechaRegistro,
            aduanaLiquidadora: payload.vehicleRegistration.aduanaLiquidadora,
            validaHasta: payload.vehicleRegistration.validaHasta,
          })
        : this.vehicleRegistrationsRepository.create({
            noTarjeta: payload.vehicleRegistration.noTarjeta,
            fechaRegistro: payload.vehicleRegistration.fechaRegistro,
            aduanaLiquidadora: payload.vehicleRegistration.aduanaLiquidadora,
            validaHasta: payload.vehicleRegistration.validaHasta,
            vehicle: updatedVehicle,
          });

      await this.vehicleRegistrationsRepository.save(vehicleRegistration);
    }

    return this.vehiclesRepository.findOne({
      where: { placa: updatedVehicle.placa },
      relations: ['catalog', 'taxpayer', 'propertyCertificates', 'vehicleRegistrations'],
    });
  }

  async inactivateVehicle(placa: string) {
    const vehicle = await this.findOneVehicle(placa, { role: Role.Admin });
    vehicle.estado = EstadoVehiculo.INACTIVO_ADMINISTRATIVO;
    return this.vehiclesRepository.save(vehicle);
  }

  private async getNitByUser(user?: AuthUser) {
    if (!user?.sub) {
      throw new ForbiddenException('User not authenticated');
    }

    const userId = typeof user.sub === 'number' ? user.sub : Number(user.sub);
    if (!userId || Number.isNaN(userId)) {
      throw new ForbiddenException('Invalid user');
    }

    const taxpayer = await this.taxpayersRepository.createQueryBuilder('taxpayer').leftJoin('taxpayer.profile', 'profile').leftJoin('profile.user', 'user').where('user.idUsuario = :userId', { userId }).getOne();

    if (!taxpayer) {
      throw new ForbiddenException('Taxpayer not found');
    }

    return taxpayer.NIT;
  }
}
