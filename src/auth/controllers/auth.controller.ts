import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { User } from '../../users/entities/user.entity';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Public()
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as User;
    const response = {
      user,
      access_token: this.authService.generateToken(user),
    };
    console.log('Login Response Backend:', response);
    return response;
  }
}
