import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { Role } from '../models/role.enum';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { RolesOrOwnerGuard } from '../guards/roles-or-owner.guard';

export const Auth = (...roles: Role[]) => applyDecorators(UseGuards(JwtAuthGuard, RolesGuard), Roles(...roles));
export const AuthOrOwner = (...roles: Role[]) => applyDecorators(UseGuards(JwtAuthGuard, RolesOrOwnerGuard), Roles(...roles));
