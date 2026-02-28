import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../models/role.enum';

@Injectable()
export class RolesOrOwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as { role?: Role; sub?: number } | undefined;
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
