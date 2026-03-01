import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTaxpayerDto {
  @IsString()
  @IsNotEmpty()
  NIT: string;

  @IsString()
  @IsNotEmpty()
  CUI: string;

  @IsString()
  @IsOptional()
  nombreEmpresa?: string;

  @IsString()
  @IsNotEmpty()
  domicilioFiscal: string;
}

export class UpdateTaxpayerDto extends PartialType(CreateTaxpayerDto) {}
