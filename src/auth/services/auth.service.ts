import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
import { Payload } from '../models/payload.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.getUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  }

  generateToken(user: User) {
    const payload: Payload = { sub: user.idUsuario, role: user.role };
    return this.jwtService.sign(payload);
  }
}
