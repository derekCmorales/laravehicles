import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class CreateCatalogDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  codigoISCV: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  marca: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  lineaEstilo: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  tipoVehiculo: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Min(0)
  valorBase: number;
}

export class UpdateCatalogDto extends PartialType(OmitType(CreateCatalogDto, ['codigoISCV'] as const)) {}
