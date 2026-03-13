import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto, CreateUserWithProfileTaxpayerDto, UpdateUserDto, UpdateUserWithProfileTaxpayerDto } from '../dtos/user.dto';
import { Profile } from '../entities/profile.entity';
import { Taxpayer } from '../entities/taxpayer.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
    @InjectRepository(Taxpayer)
    private taxpayersRepository: Repository<Taxpayer>,
  ) {}

  async create(payload: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({ where: { username: payload.username } });
    if (existingUser) {
      throw new BadRequestException('Usuario ya existe');
    }
    const user = this.usersRepository.create(payload);
    return this.usersRepository.save(user);
  }

  async createWithProfileTaxpayer(payload: CreateUserWithProfileTaxpayerDto) {
    const existingUser = await this.usersRepository.findOne({ where: { username: payload.username } });
    if (existingUser) {
      throw new BadRequestException('Usuario ya existe');
    }

    const existingNit = await this.taxpayersRepository.findOne({ where: { NIT: payload.taxpayer.NIT } });
    if (existingNit) {
      throw new BadRequestException('NIT ingresado ya existente');
    }

    const existingCui = await this.taxpayersRepository.findOne({ where: { CUI: payload.taxpayer.CUI } });
    if (existingCui) {
      throw new BadRequestException('CUI ingresado ya existente');
    }

    const user = this.usersRepository.create({
      username: payload.username,
      password: payload.password,
      role: payload.role,
    });

    const profile = this.profilesRepository.create({
      primerNombre: payload.profile.primerNombre,
      segundoNombre: payload.profile.segundoNombre,
      primerApellido: payload.profile.primerApellido,
      segundoApellido: payload.profile.segundoApellido,
      fechaNacimiento: payload.profile.fechaNacimiento,
      user,
    });

    const taxpayer = this.taxpayersRepository.create({
      NIT: payload.taxpayer.NIT,
      CUI: payload.taxpayer.CUI,
      nombreEmpresa: payload.taxpayer.nombreEmpresa,
      domicilioFiscal: payload.taxpayer.domicilioFiscal,
      profile,
    });

    await this.taxpayersRepository.save(taxpayer);

    return this.usersRepository.findOne({
      where: { idUsuario: user.idUsuario },
      relations: ['profile', 'profile.taxpayer'],
    });
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { idUsuario: id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, payload: UpdateUserDto) {
    const user = await this.findOne(id);
    this.usersRepository.merge(user, payload);
    return this.usersRepository.save(user);
  }

  async updateWithProfileTaxpayer(id: number, payload: UpdateUserWithProfileTaxpayerDto) {
    const user = await this.usersRepository.findOne({ where: { idUsuario: id }, relations: ['profile', 'profile.taxpayer'] });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (payload.username || payload.password || payload.role) {
      this.usersRepository.merge(user, {
        username: payload.username ?? user.username,
        password: payload.password ?? user.password,
        role: payload.role ?? user.role,
      });
    }

    const profile = user.profile;
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    if (payload.profile) {
      this.profilesRepository.merge(profile, payload.profile);
    }

    const taxpayer = profile.taxpayer;
    if (!taxpayer) {
      throw new NotFoundException('Taxpayer not found');
    }

    if (payload.taxpayer) {
      if (payload.taxpayer.NIT && payload.taxpayer.NIT !== taxpayer.NIT) {
        const existingNit = await this.taxpayersRepository.findOne({ where: { NIT: payload.taxpayer.NIT } });
        if (existingNit) {
          throw new BadRequestException('NIT ingresado ya existente');
        }
      }

      if (payload.taxpayer.CUI && payload.taxpayer.CUI !== taxpayer.CUI) {
        const existingCui = await this.taxpayersRepository.findOne({ where: { CUI: payload.taxpayer.CUI } });
        if (existingCui) {
          throw new BadRequestException('CUI ingresado ya existente');
        }
      }

      this.taxpayersRepository.merge(taxpayer, payload.taxpayer);
    }

    await this.usersRepository.save(user);
    await this.profilesRepository.save(profile);
    await this.taxpayersRepository.save(taxpayer);

    return this.usersRepository.findOne({
      where: { idUsuario: id },
      relations: ['profile', 'profile.taxpayer'],
    });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }

  async getUserByUsername(username: string) {
    return this.usersRepository.findOne({
      where: { username },
      select: ['idUsuario', 'username', 'password', 'role'],
      relations: ['profile'],
    });
  }

  async findAllProfilesTaxpayers() {
    return this.usersRepository.find({
      relations: ['profile', 'profile.taxpayer'],
    });
  }

  async findOneProfileTaxpayerbyNIT(id: string) {
    const user = await this.taxpayersRepository.findOne({
      where: { NIT: id },
      relations: ['profile', 'profile.user'],
    });
    if (!user) {
      throw new NotFoundException('contribuyente no encontrado');
    }
    return user;
  }
}
