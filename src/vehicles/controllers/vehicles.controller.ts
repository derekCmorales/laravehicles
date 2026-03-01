import { Controller, Get, Post, Body, Patch, Param, Req } from '@nestjs/common';
import type { Request } from 'express';
import { VehiclesService } from '../services/vehicles.service';
import { CreateVehicleWithPropertyRegistrationDto, UpdateVehicleWithPropertyRegistrationDto } from '../dto/vehicle.dto';
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
}
