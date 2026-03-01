import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../models/role.enum';

@Injectable()
export class RolesOrOwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user?: { role?: Role; sub?: number | string }; params?: { id?: string } }>();
    const user = request.user;
    if (!user) {
      return false;
    }

    if (requiredRoles.includes(user.role as Role)) {
      return true;
    }

    const paramId = request.params?.id;
    if (!paramId) {
      return false;
    }

    const userId = typeof user.sub === 'number' ? user.sub : Number(user.sub);
    return Number(paramId) === userId;
  }
}
