import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVehicleDecalDto {
  @IsString()
  @IsNotEmpty()
  idCalcomania: string;

  @IsNumber()
  @IsNotEmpty()
  anio: number;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsDateString()
  @IsNotEmpty()
  fechaImpresion: Date;
}

export class UpdateVehicleDecalDto extends PartialType(CreateVehicleDecalDto) {}
