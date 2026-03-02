import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehicleWithPropertyRegistrationDto, UpdateVehicleWithPropertyRegistrationDto } from '../dto/vehicle.dto';
import { UpdatePropertyCertificateDto } from '../dto/propertyCertificate.dto';
import { UpdateVehicleRegistrationDto } from '../dto/vehicleRegistration.dto';
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
      return this.vehiclesRepository.find({ relations: ['catalog', 'taxpayer', 'taxpayer.profile'] });
    }

    const nit = await this.getNitByUser(user);
    return this.vehiclesRepository.find({ where: { taxpayer: { NIT: nit } }, relations: ['catalog', 'taxpayer', 'taxpayer.profile'] });
  }

  async findOneVehicle(placa: string, user?: AuthUser) {
    const vehicle = await this.vehiclesRepository.findOne({ where: { placa }, relations: ['catalog', 'taxpayer', 'taxpayer.profile'] });
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

  async findPropertyCertificateByPlaca(placa: string, user?: AuthUser) {
    const propertyCertificate = await this.propertyCertificatesRepository.createQueryBuilder('propertyCertificate').leftJoinAndSelect('propertyCertificate.vehicle', 'vehicle').leftJoinAndSelect('vehicle.taxpayer', 'taxpayer').where('vehicle.placa = :placa', { placa }).getOne();

    if (!propertyCertificate) {
      throw new NotFoundException('Property certificate not found');
    }

    if (user?.role === Role.Admin) {
      return propertyCertificate;
    }

    const nit = await this.getNitByUser(user);
    if (propertyCertificate.vehicle?.taxpayer?.NIT !== nit) {
      throw new ForbiddenException('Property certificate not assigned to user');
    }

    return propertyCertificate;
  }

  async updatePropertyCertificateByPlaca(placa: string, payload: UpdatePropertyCertificateDto) {
    const propertyCertificate = await this.propertyCertificatesRepository.createQueryBuilder('propertyCertificate').leftJoinAndSelect('propertyCertificate.vehicle', 'vehicle').where('vehicle.placa = :placa', { placa }).getOne();

    if (!propertyCertificate) {
      throw new NotFoundException('Property certificate not found');
    }

    const updated = this.propertyCertificatesRepository.merge(propertyCertificate, payload);
    return this.propertyCertificatesRepository.save(updated);
  }

  async findVehicleRegistrationByPlaca(placa: string, user?: AuthUser) {
    const vehicleRegistration = await this.vehicleRegistrationsRepository.createQueryBuilder('vehicleRegistration').leftJoinAndSelect('vehicleRegistration.vehicle', 'vehicle').leftJoinAndSelect('vehicle.taxpayer', 'taxpayer').where('vehicle.placa = :placa', { placa }).getOne();

    if (!vehicleRegistration) {
      throw new NotFoundException('Vehicle registration not found');
    }

    if (user?.role === Role.Admin) {
      return vehicleRegistration;
    }

    const nit = await this.getNitByUser(user);
    if (vehicleRegistration.vehicle?.taxpayer?.NIT !== nit) {
      throw new ForbiddenException('Vehicle registration not assigned to user');
    }

    return vehicleRegistration;
  }

  async updateVehicleRegistrationByPlaca(placa: string, payload: UpdateVehicleRegistrationDto) {
    const vehicleRegistration = await this.vehicleRegistrationsRepository.createQueryBuilder('vehicleRegistration').leftJoinAndSelect('vehicleRegistration.vehicle', 'vehicle').where('vehicle.placa = :placa', { placa }).getOne();

    if (!vehicleRegistration) {
      throw new NotFoundException('Vehicle registration not found');
    }

    const updated = this.vehicleRegistrationsRepository.merge(vehicleRegistration, payload);
    return this.vehicleRegistrationsRepository.save(updated);
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

  async generateCalcomania(placa: string, user?: AuthUser) {
    const vehicle = await this.vehiclesRepository.findOne({
      where: { placa },
      relations: ['catalog', 'taxpayer', 'taxpayer.profile', 'propertyCertificates', 'vehicleRegistrations'],
    });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    if (user?.role !== Role.Admin) {
      const nit = await this.getNitByUser(user);
      if (vehicle.taxpayer?.NIT !== nit) {
        throw new ForbiddenException('Vehicle not assigned to user');
      }
    }

    const currentYear = new Date().getFullYear();
    const fechaPago = new Date();
    const valorBaseCatalogo = vehicle.catalog?.valorBase ?? 0;
    const tipoVehiculo = vehicle.catalog?.tipoVehiculo ?? '';
    const montoIscv = this.calcularMontoIscv(vehicle.modelo, valorBaseCatalogo, tipoVehiculo, currentYear, fechaPago);

    const propertyCertificate = vehicle.propertyCertificates?.[0];
    const vehicleRegistration = vehicle.vehicleRegistrations?.[0];

    const propietario = this.getNombreContribuyente(vehicle.taxpayer);
    const marca = this.getDescripcionCatalogo(vehicle.catalog);

    const calcomaniaData = {
      placa: vehicle.placa,
      modelo: vehicle.modelo,
      color: vehicle.color,
      propietario,
      marca,
      anio: currentYear,
      montoIscv,
      noCertificadoVigente: propertyCertificate?.noCertificado ?? null,
      noTarjetaVigente: vehicleRegistration?.noTarjeta ?? null,
      fechaPago,
    };

    return calcomaniaData;
  }

  private getNombreContribuyente(taxpayer?: Taxpayer) {
    if (!taxpayer) {
      return 'N/A';
    }

    if (taxpayer.nombreEmpresa) {
      return taxpayer.nombreEmpresa;
    }

    const profile = taxpayer.profile;
    if (!profile) {
      return 'N/A';
    }

    const nombres = [profile.primerNombre, profile.segundoNombre].filter(Boolean).join(' ');
    const apellidos = [profile.primerApellido, profile.segundoApellido].filter(Boolean).join(' ');
    const nombreCompleto = [nombres, apellidos].filter(Boolean).join(' ').trim();

    return nombreCompleto || 'N/A';
  }

  private getDescripcionCatalogo(catalog?: Catalog) {
    if (!catalog) {
      return 'N/A';
    }

    return [catalog.marca, catalog.lineaEstilo].filter(Boolean).join(' ').trim() || 'N/A';
  }

  /**
   * Calcula el monto a pagar por el Impuesto de Circulacion (ISCV)
   */
  private calcularMontoIscv(modeloVehiculo: number, valorBaseCatalogo: number, tipoVehiculo: string, anioCobro: number, fechaPago: Date): number {
    const antiguedad = anioCobro - modeloVehiculo;

    let porcentajeDepreciacion = 0;
    if (antiguedad === 1) porcentajeDepreciacion = 0.2;
    else if (antiguedad === 2) porcentajeDepreciacion = 0.4;
    else if (antiguedad === 3) porcentajeDepreciacion = 0.6;
    else if (antiguedad >= 4) porcentajeDepreciacion = 0.8;

    const valorImponible = valorBaseCatalogo - valorBaseCatalogo * porcentajeDepreciacion;

    let impuesto = valorImponible * 0.002;

    const impuestoMinimo = tipoVehiculo === 'MOTOCICLETA' ? 75.0 : 110.0;
    if (impuesto < impuestoMinimo) {
      impuesto = impuestoMinimo;
    }

    const fechaLimite = new Date(`${anioCobro}-07-31T23:59:59`);
    let totalAPagar = 0;

    if (fechaPago <= fechaLimite) {
      totalAPagar = impuesto * 0.5;
    } else {
      const multa = impuesto * 1.0;
      totalAPagar = impuesto + multa;
    }

    return totalAPagar;
  }
}
