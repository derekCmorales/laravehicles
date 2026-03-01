import { Injectable } from '@nestjs/common';
import { CreateVehicleDto, UpdateVehicleDto } from '../dto/vehicle.dto';

@Injectable()
export class VehiclesService {
  create(_createVehicleDto: CreateVehicleDto) {
    void _createVehicleDto;
    return 'This action adds a new vehicle';
  }

  findAll() {
    return `This action returns all vehicles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, _updateVehicleDto: UpdateVehicleDto) {
    void _updateVehicleDto;
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
