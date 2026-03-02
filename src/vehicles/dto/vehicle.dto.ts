import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreatePropertyCertificateDto } from './propertyCertificate.dto';
import { Type } from 'class-transformer';
import { CreateVehicleRegistrationDto } from './vehicleRegistration.dto';
import { CreateVehicleDecalDto } from './vehicleDecal.dto';
import { EstadoVehiculo } from '../entities/vehicle.entity';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  placa: string;

  @IsString()
  @IsNotEmpty()
  codigoUnicoIdentificador: string;

  @IsString()
  @IsNotEmpty()
  uso: string;

  @IsNumber()
  @IsNotEmpty()
  modelo: number;

  @IsString()
  @IsNotEmpty()
  vin: string;

  @IsString()
  @IsNotEmpty()
  serie: string;

  @IsString()
  @IsNotEmpty()
  chasis: string;

  @IsString()
  @IsNotEmpty()
  motor: string;

  @IsNumber()
  @IsNotEmpty()
  centimetrosCubicos: number;

  @IsNumber()
  @IsNotEmpty()
  asientos: number;

  @IsNumber()
  @IsNotEmpty()
  cilindros: number;

  @IsString()
  @IsNotEmpty()
  combustible: string;

  @IsNumber()
  @IsNotEmpty()
  puertas: number;

  @IsNumber()
  @IsNotEmpty()
  tonelaje: number;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  ejes: number;

  @IsString()
  @IsNotEmpty()
  nit: string;

  @IsString()
  @IsNotEmpty()
  codigoISCV: string;
}
export class CreateVehicleWithPropertyRegistrationDto extends CreateVehicleDto {
  @ValidateNested()
  @Type(() => CreatePropertyCertificateDto)
  @IsNotEmpty()
  propertyCertificate: CreatePropertyCertificateDto;

  @ValidateNested()
  @Type(() => CreateVehicleRegistrationDto)
  @IsNotEmpty()
  vehicleRegistration: CreateVehicleRegistrationDto;
}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}

export class UpdateVehicleWithPropertyRegistrationDto extends PartialType(CreateVehicleDto) {
  @IsEnum(EstadoVehiculo)
  estado?: EstadoVehiculo;

  @ValidateNested()
  @Type(() => CreatePropertyCertificateDto)
  @IsNotEmpty()
  propertyCertificate?: CreatePropertyCertificateDto;

  @ValidateNested()
  @Type(() => CreateVehicleRegistrationDto)
  @IsNotEmpty()
  vehicleRegistration?: CreateVehicleRegistrationDto;
}

export class generateVehicleDecalDto extends CreateVehicleDto {
  @ValidateNested()
  @Type(() => CreateVehicleDecalDto)
  @IsNotEmpty()
  vehicleDecal: CreateVehicleDecalDto;

  @ValidateNested()
  @Type(() => CreatePropertyCertificateDto)
  @IsNotEmpty()
  propertyCertificate: CreatePropertyCertificateDto;

  @ValidateNested()
  @Type(() => CreateVehicleRegistrationDto)
  @IsNotEmpty()
  vehicleRegistration: CreateVehicleRegistrationDto;
}
