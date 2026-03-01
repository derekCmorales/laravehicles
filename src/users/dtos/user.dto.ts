import { IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Role } from '../../auth/models/role.enum';
import { Type } from 'class-transformer';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';
import { CreateTaxpayerDto, UpdateTaxpayerDto } from './taxpayer.dto';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  role: Role;
}

export class CreateUserWithProfileTaxpayerDto extends CreateUserDto {
  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  profile: CreateProfileDto;

  @ValidateNested()
  @Type(() => CreateTaxpayerDto)
  @IsNotEmpty()
  taxpayer: CreateTaxpayerDto;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserWithProfileTaxpayerDto extends PartialType(CreateUserDto) {
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  @IsOptional()
  profile?: UpdateProfileDto;

  @ValidateNested()
  @Type(() => UpdateTaxpayerDto)
  @IsOptional()
  taxpayer?: UpdateTaxpayerDto;
}
