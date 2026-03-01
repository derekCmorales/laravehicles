import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePropertyCertificateDto {
  @IsString()
  @IsNotEmpty()
  noCertificado: string;

  @IsString()
  @IsNotEmpty()
  codigoUnicoIdentificador: string;

  @IsDateString()
  @IsNotEmpty()
  fechaEmision: string;

  @IsString()
  @IsNotEmpty()
  aduanaLiquidadora: string;

  @IsString()
  @IsNotEmpty()
  polizaImportacion: string;

  @IsDateString()
  @IsNotEmpty()
  fechaPoliza: string;

  @IsNumber()
  @IsNotEmpty()
  franquiciaNo: number;
}

export class UpdatePropertyCertificateDto extends PartialType(CreatePropertyCertificateDto) {}
