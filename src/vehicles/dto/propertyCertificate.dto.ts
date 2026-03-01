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
  fechaEmision: Date;

  @IsString()
  @IsNotEmpty()
  aduanaLiquidadora: string;

  @IsString()
  @IsNotEmpty()
  polizaImportacion: string;

  @IsDateString()
  @IsNotEmpty()
  fechaPoliza: Date;

  @IsNumber()
  @IsNotEmpty()
  franquiciaNo: number;
}

export class UpdatePropertyCertificateDto extends PartialType(CreatePropertyCertificateDto) {}
