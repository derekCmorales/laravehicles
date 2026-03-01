import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleDecal } from './vehicleDecal.entity';

@Entity({ name: 'certificado_propiedad' })
export class PropertyCertificate {
  @PrimaryColumn({ type: 'varchar', length: 30, unique: true, name: 'no_certificado', nullable: false })
  noCertificado: string;

  @Column({ type: 'varchar', length: 50, unique: true, name: 'codigo_unico_identificador', nullable: false })
  codigoUnicoIdentificador: string;

  @Column({ type: 'date', name: 'fecha_emision', nullable: false })
  fechaEmision: Date;

  @Column({ type: 'varchar', length: 255, name: 'aduana_liquidadora', nullable: false })
  aduanaLiquidadora: string;

  @Column({ type: 'varchar', length: 50, name: 'poliza_importacion', nullable: false })
  polizaImportacion: string;

  @Column({ type: 'date', name: 'fecha_poliza', nullable: false })
  fechaPoliza: Date;

  @Column({ type: 'int', name: 'franquicia_no', nullable: false })
  franquiciaNo: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.propertyCertificates, { nullable: false })
  @JoinColumn({ name: 'placa', referencedColumnName: 'placa' })
  vehicle: Vehicle;

  @OneToMany(() => VehicleDecal, (vehicleDecal) => vehicleDecal.propertyCertificate)
  vehicleDecals: VehicleDecal[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
}
