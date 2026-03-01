import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, CreateUserWithProfileTaxpayerDto, UpdateUserDto, UpdateUserWithProfileTaxpayerDto } from '../dtos/user.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { Role } from '../../auth/models/role.enum';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Auth(Role.Admin)
  @Post('/admins')
  createAdmin(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Public()
  @Post('/taxpayers')
  create(@Body() payload: CreateUserWithProfileTaxpayerDto) {
    return this.usersService.createWithProfileTaxpayer(payload);
  }

  @Auth(Role.Admin)
  @Put('/taxpayers/:id')
  updateTaxpayer(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUserWithProfileTaxpayerDto) {
    return this.usersService.updateWithProfileTaxpayer(id, payload);
  }

  @Auth(Role.Admin)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Auth(Role.Admin)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Auth(Role.Admin)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @Auth(Role.Admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
