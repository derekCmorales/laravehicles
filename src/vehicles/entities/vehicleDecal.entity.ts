import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { PropertyCertificate } from './propertyCertificate.entity';
import { Vehicle } from './vehicle.entity';
import { VehicleRegistration } from './vehicleRegistration.entity';

@Entity({ name: 'calcomania' })
export class VehicleDecal {
  @PrimaryColumn({ type: 'varchar', length: 30, unique: true, name: 'id_calcomania', nullable: false })
  idCalcomania: string;

  @Column({ type: 'int', name: 'anio', nullable: false })
  anio: number;

  @Column({ type: 'varchar', length: 20, name: 'estado', nullable: false, default: 'PENDIENTE' })
  estado: string;

  @Column({ type: 'timestamp', name: 'fecha_impresion', nullable: true })
  fechaImpresion: Date | null;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.vehicleDecals, { nullable: false })
  @JoinColumn({ name: 'placa', referencedColumnName: 'placa' })
  vehicle: Vehicle;

  @ManyToOne(() => PropertyCertificate, (propertyCertificate) => propertyCertificate.vehicleDecals, {
    nullable: false,
  })
  @JoinColumn({ name: 'no_certificado_vigente', referencedColumnName: 'noCertificado' })
  propertyCertificate: PropertyCertificate;

  @ManyToOne(() => VehicleRegistration, (vehicleRegistration) => vehicleRegistration.vehicleDecals, {
    nullable: false,
  })
  @JoinColumn({ name: 'no_tarjeta_vigente', referencedColumnName: 'noTarjeta' })
  vehicleRegistration: VehicleRegistration;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
}
