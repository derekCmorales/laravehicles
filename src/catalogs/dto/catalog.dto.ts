import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCatalogDto {
  @IsString()
  @IsNotEmpty()
  codigoISCV: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  @IsNotEmpty()
  lineaEstilo: string;

  @IsString()
  @IsNotEmpty()
  tipoVehiculo: string;

  @IsNumber()
  @IsNotEmpty()
  valorBase: number;
}

export class UpdateCatalogDto extends PartialType(CreateCatalogDto) {}
