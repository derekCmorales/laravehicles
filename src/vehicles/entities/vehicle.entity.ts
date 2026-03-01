import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Catalog } from '../../catalogs/entities/catalog.entity';
import { PropertyCertificate } from './propertyCertificate.entity';
import { VehicleRegistration } from './vehicleRegistration.entity';
import { VehicleDecal } from './vehicleDecal.entity';
import { Taxpayer } from '../../users/entities/taxpayer.entity';

@Entity({ name: 'vehiculo' })
export class Vehicle {
  @PrimaryColumn({ type: 'varchar', length: 30, unique: true, name: 'placa', nullable: false })
  placa: string;

  @Column({ type: 'varchar', length: 50, unique: true, name: 'codigo_unico_identificador', nullable: false })
  codigoUnicoIdentificador: string;

  @Column({ type: 'varchar', length: 50, name: 'uso', nullable: false })
  uso: string;

  @Column({ type: 'int', name: 'modelo', nullable: false })
  modelo: number;

  @Column({ type: 'varchar', length: 50, name: 'vin', nullable: false, unique: true })
  vin: string;

  @Column({ type: 'varchar', length: 100, name: 'serie', nullable: false })
  serie: string;

  @Column({ type: 'varchar', length: 100, name: 'chasis', nullable: false })
  chasis: string;

  @Column({ type: 'varchar', length: 100, name: 'motor', nullable: false })
  motor: string;

  @Column({ type: 'int', name: 'centimetros_cubicos', nullable: false })
  centimetrosCubicos: number;

  @Column({ type: 'int', name: 'asientos', nullable: false })
  asientos: number;

  @Column({ type: 'int', name: 'cilindros', nullable: false })
  cilindros: number;

  @Column({ type: 'varchar', length: 30, name: 'combustible', nullable: false })
  combustible: string;

  @Column({ type: 'int', name: 'puertas', nullable: false })
  puertas: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'tonelaje', nullable: false })
  tonelaje: number;

  @Column({ type: 'varchar', length: 30, name: 'color', nullable: false })
  color: string;

  @Column({ type: 'int', name: 'ejes', nullable: false })
  ejes: number;

  @ManyToOne(() => Catalog, (catalog) => catalog.vehicles, { nullable: false })
  @JoinColumn({ name: 'codigo_iscv', referencedColumnName: 'codigoISCV' })
  catalog: Catalog;

  @ManyToOne(() => Taxpayer, (taxpayer) => taxpayer.vehicles, { nullable: false })
  @JoinColumn({ name: 'nit', referencedColumnName: 'NIT' })
  taxpayer: Taxpayer;

  @OneToMany(() => PropertyCertificate, (propertyCertificate) => propertyCertificate.vehicle)
  propertyCertificates: PropertyCertificate[];

  @OneToMany(() => VehicleRegistration, (vehicleRegistration) => vehicleRegistration.vehicle)
  vehicleRegistrations: VehicleRegistration[];

  @OneToMany(() => VehicleDecal, (vehicleDecal) => vehicleDecal.vehicle)
  vehicleDecals: VehicleDecal[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
}
