import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
