import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, CreateUserWithProfileTaxpayerDto, UpdateUserWithProfileTaxpayerDto } from '../dtos/user.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { Role } from '../../auth/models/role.enum';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // create de usuarios admins/ bearer token de admin requerido
  @Auth(Role.Admin)
  @Post('/admins')
  createAdmin(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  // creacion de contribuyentes, pide mas informacion para crear perfil y contribuyente en una sola ruta
  @Public()
  @Post('/taxpayers')
  createWithProfileTaxpayer(@Body() payload: CreateUserWithProfileTaxpayerDto) {
    return this.usersService.createWithProfileTaxpayer(payload);
  }

  // update de contribuyente solo editable [para admins (como ir a sat para realizar cambios)
  @Auth(Role.Admin)
  @Put('/taxpayers/:id')
  updateTaxpayer(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUserWithProfileTaxpayerDto) {
    return this.usersService.updateWithProfileTaxpayer(id, payload);
  }

  // consulta todos los usuarios
  @Auth(Role.Admin)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // obtiene un perfil e informacion de contribuyente por id
  @Auth(Role.Admin)
  @Get('/profiles-taxpayers/:id')
  findOneProfileTaxpayerbyNIT(@Param('id') id: string) {
    return this.usersService.findOneProfileTaxpayerbyNIT(id);
  }

  // obtiene todos los perfiles e informacion de contribuyente
  @Auth(Role.Admin)
  @Get('/profiles-taxpayers')
  findAllProfilesTaxpayers() {
    return this.usersService.findAllProfilesTaxpayers();
  }

  //consulta un solo usuario por id
  @Auth(Role.Admin)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // delete de usuarios, caso muy especifico
  @Auth(Role.Admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
