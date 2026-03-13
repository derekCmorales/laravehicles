import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVehicleDecalDto {
  @IsString()
  @IsNotEmpty()
  idCalcomania: string;

  @IsNumber()
  @IsNotEmpty()
  anio: number;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsOptional()
  @IsDateString()
  fechaImpresion?: Date;
}

export class UpdateVehicleDecalDto extends PartialType(CreateVehicleDecalDto) {}
