import { CanActivate, ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { Observable } from 'rxjs';

@Injectable()
export class AppAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(JwtAuthGuard) private jwtAuthGuard: JwtAuthGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const result = this.jwtAuthGuard.canActivate(context) as boolean | Promise<boolean> | Observable<boolean>;
    if (result instanceof Promise) {
      return result;
    }

    if (typeof (result as Observable<boolean>)?.subscribe === 'function') {
      return await new Promise<boolean>((resolve, reject) => {
        (result as Observable<boolean>).subscribe({
          next: resolve,
          error: reject,
        });
      });
    }

    return result as boolean;
  }
}
