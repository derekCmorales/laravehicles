export enum Role {
  User = "user",
  Admin = "admin",
}

export enum EstadoVehiculo {
  ACTIVO = "ACTIVO",
  INACTIVO_ADMINISTRATIVO = "INACTIVO_ADMINISTRATIVO",
  ROBADO = "ROBADO",
  DESTRUIDO = "DESTRUIDO",
}

export interface User {
  idUsuario: number;
  username: string;
  role: Role;
  fechaCreacion: string;
  fechaActualizacion: string;
  profile?: Profile;
}

export interface Profile {
  idPerfil: number;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  fechaNacimiento: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  taxpayer?: Taxpayer;
}

export interface Taxpayer {
  NIT: string;
  CUI: string;
  nombreEmpresa?: string;
  domicilioFiscal: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  profile?: Profile;
  vehicles?: Vehicle[];
}

export interface Catalog {
  codigoISCV: string;
  marca: string;
  lineaEstilo: string;
  tipoVehiculo: string;
  valorBase: number;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface Vehicle {
  placa: string;
  codigoUnicoIdentificador: string;
  uso: string;
  estado: EstadoVehiculo;
  modelo: number;
  vin: string;
  serie: string;
  chasis: string;
  motor: string;
  centimetrosCubicos: number;
  asientos: number;
  cilindros: number;
  combustible: string;
  puertas: number;
  tonelaje: number;
  color: string;
  ejes: number;
  catalog?: Catalog;
  taxpayer?: Taxpayer;
  propertyCertificates?: PropertyCertificate[];
  vehicleRegistrations?: VehicleRegistration[];
  vehicleDecals?: VehicleDecal[];
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface PropertyCertificate {
  noCertificado: string;
  codigoUnicoIdentificador: string;
  fechaEmision: string;
  aduanaLiquidadora: string;
  polizaImportacion: string;
  fechaPoliza: string;
  franquiciaNo: number;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface VehicleRegistration {
  noTarjeta: string;
  fechaRegistro: string;
  aduanaLiquidadora: string;
  validaHasta: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface VehicleDecal {
  idCalcomania: string;
  anio: number;
  estado: string;
  fechaImpresion: string | null;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface CreateUserWithProfileTaxpayer {
  username: string;
  password: string;
  role: Role;
  profile: {
    primerNombre: string;
    segundoNombre?: string;
    primerApellido: string;
    segundoApellido?: string;
    fechaNacimiento: string;
  };
  taxpayer: {
    NIT: string;
    CUI: string;
    nombreEmpresa?: string;
    domicilioFiscal: string;
  };
}
