import { PartialType } from '@nestjs/mapped-types';

export class CreatePropertyCertificateDto {
  noCertificado: string;
  codigoUnicoIdentificador: string;
  fechaEmision: Date;
  aduanaLiquidadora: string;
  polizaImportacion: string;
  fechaPoliza: Date;
  franquiciaNo: number;
}

export class UpdatePropertyCertificateDto extends PartialType(CreatePropertyCertificateDto) {}
