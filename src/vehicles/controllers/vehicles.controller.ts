import { Controller, Get, Post, Body, Patch, Param, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { VehiclesService } from '../services/vehicles.service';
import { CreateVehicleWithPropertyRegistrationDto, UpdateVehicleWithPropertyRegistrationDto } from '../dto/vehicle.dto';
import { UpdatePropertyCertificateDto } from '../dto/propertyCertificate.dto';
import { UpdateVehicleRegistrationDto } from '../dto/vehicleRegistration.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { Role } from '../../auth/models/role.enum';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Auth(Role.Admin)
  @Post()
  CreateVehicleWithPropertyRegistration(@Body() CreateVehicleWithPropertyRegistrationDto: CreateVehicleWithPropertyRegistrationDto) {
    return this.vehiclesService.CreateVehicleWithPropertyRegistration(CreateVehicleWithPropertyRegistrationDto);
  }

  @Auth(Role.Admin, Role.User)
  @Get()
  findAllVehicles(@Req() req: Request) {
    return this.vehiclesService.findAllVehicles(req.user);
  }

  @Auth(Role.Admin, Role.User)
  @Get(':placa')
  findOneVehicle(@Param('placa') placa: string, @Req() req: Request) {
    return this.vehiclesService.findOneVehicle(placa, req.user);
  }

  @Auth(Role.Admin)
  @Patch(':placa')
  updateVehicleWithPropertyRegistration(@Param('placa') placa: string, @Body() UpdateVehicleWithPropertyRegistrationDto: UpdateVehicleWithPropertyRegistrationDto) {
    return this.vehiclesService.updateVehicleWithPropertyRegistration(placa, UpdateVehicleWithPropertyRegistrationDto);
  }

  @Auth(Role.Admin)
  @Patch(':placa/inactivar')
  inactivateVehicle(@Param('placa') placa: string) {
    return this.vehiclesService.inactivateVehicle(placa);
  }

  @Auth(Role.Admin)
  @Patch(':placa/activar')
  activateVehicle(@Param('placa') placa: string) {
    return this.vehiclesService.activateVehicle(placa);
  }

  @Auth(Role.Admin, Role.User)
  @Get(':placa/property-certificate')
  findPropertyCertificateByPlaca(@Param('placa') placa: string, @Req() req: Request) {
    return this.vehiclesService.findPropertyCertificateByPlaca(placa, req.user);
  }

  @Auth(Role.Admin)
  @Patch(':placa/property-certificate')
  updatePropertyCertificateByPlaca(@Param('placa') placa: string, @Body() payload: UpdatePropertyCertificateDto) {
    return this.vehiclesService.updatePropertyCertificateByPlaca(placa, payload);
  }

  @Auth(Role.Admin, Role.User)
  @Get(':placa/property-certificate/pdf')
  async exportPropertyCertificatePdf(@Param('placa') placa: string, @Req() req: Request, @Res() res: Response) {
    const pdfBuffer = await this.vehiclesService.exportPropertyCertificatePdf(placa, req.user);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Certificado_Propiedad_${placa}.pdf"`,
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);
  }

  @Auth(Role.Admin, Role.User)
  @Get(':placa/vehicle-registration')
  findVehicleRegistrationByPlaca(@Param('placa') placa: string, @Req() req: Request) {
    return this.vehiclesService.findVehicleRegistrationByPlaca(placa, req.user);
  }

  @Auth(Role.Admin, Role.User)
  @Get(':placa/vehicle-registration/pdf')
  async exportVehicleRegistrationPdf(@Param('placa') placa: string, @Req() req: Request, @Res() res: Response) {
    const pdfBuffer = await this.vehiclesService.exportVehicleRegistrationPdf(placa, req.user);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Tarjeta_Circulacion_${placa}.pdf"`,
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);
  }

  @Auth(Role.Admin)
  @Patch(':placa/vehicle-registration')
  updateVehicleRegistrationByPlaca(@Param('placa') placa: string, @Body() payload: UpdateVehicleRegistrationDto) {
    return this.vehiclesService.updateVehicleRegistrationByPlaca(placa, payload);
  }

  @Auth(Role.Admin, Role.User)
  @Post(':placa/calcomania')
  generateCalcomania(@Param('placa') placa: string, @Req() req: Request) {
    return this.vehiclesService.generateCalcomania(placa, req.user);
  }

  @Auth(Role.Admin, Role.User)
  @Get(':placa/calcomania/pdf')
  async exportVehicleDecalPdf(@Param('placa') placa: string, @Req() req: Request, @Res() res: Response) {
    const pdfBuffer = await this.vehiclesService.exportVehicleDecalPdf(placa, req.user);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Calcomania_${placa}.pdf"`,
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);
  }

  @Auth(Role.Admin, Role.User)
  @Post(':placa/calcomania/pagar')
  pagarCalcomania(@Param('placa') placa: string, @Req() req: Request) {
    return this.vehiclesService.pagarCalcomania(placa, req.user);
  }
}
