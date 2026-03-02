export enum Role {
  Admin = 'admin',
  User = 'user',
}

export interface User {
  idUsuario: number;
  username: string;
  role: Role;
  profile?: Profile;
  fechaCreacion?: string;
}

export interface Profile {
  idPerfil: number;
  primerNombre: string;
  primerApellido: string;
  segundoNombre?: string;
  segundoApellido?: string;
  taxpayer?: Taxpayer;
}

export interface Taxpayer {
  NIT: string;
  CUI: string;
  domicilioFiscal: string;
  nombreEmpresa?: string;
  profile?: Profile;
}

export interface Catalog {
  codigoISCV: string;
  marca: string;
  lineaEstilo: string;
  tipoVehiculo: string;
  valorBase: number;
}

export interface Vehicle {
  placa: string;
  modelo: number;
  color: string;
  chasis: string;
  vin: string;
  motor: string;
  estado: string;
  taxpayer: Taxpayer;
  catalog: Catalog;
}

export interface PropertyCertificate {
  numeroCertificado: string;
}

export interface VehicleRegistration {
  numeroTarjeta: string;
  fechaVencimiento: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}
