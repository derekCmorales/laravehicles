import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateVehicleRegistrationDto {
  @IsString()
  @IsNotEmpty()
  noTarjeta: string;

  @IsDateString()
  @IsNotEmpty()
  fechaRegistro: Date;

  @IsString()
  @IsNotEmpty()
  aduanaLiquidadora: string;

  @IsDateString()
  @IsNotEmpty()
  validaHasta: Date;
}

export class UpdateVehicleRegistrationDto extends PartialType(CreateVehicleRegistrationDto) {}
