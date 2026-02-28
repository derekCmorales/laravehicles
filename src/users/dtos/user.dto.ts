import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Role } from '../../auth/models/role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  role?: Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
