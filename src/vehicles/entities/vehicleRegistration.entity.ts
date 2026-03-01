import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleDecal } from './vehicleDecal.entity';

@Entity({ name: 'tarjeta_circulacion' })
export class VehicleRegistration {
  @PrimaryColumn({ type: 'varchar', length: 30, unique: true, name: 'no_tarjeta', nullable: false })
  noTarjeta: string;

  @Column({ type: 'timestamp', name: 'fecha_registro', nullable: false })
  fechaRegistro: Date;

  @Column({ type: 'varchar', length: 255, name: 'aduana_liquidadora', nullable: false })
  aduanaLiquidadora: string;

  @Column({ type: 'date', name: 'validahasta', nullable: false })
  validaHasta: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.vehicleRegistrations, { nullable: false })
  @JoinColumn({ name: 'placa', referencedColumnName: 'placa' })
  vehicle: Vehicle;

  @OneToMany(() => VehicleDecal, (vehicleDecal) => vehicleDecal.vehicleRegistration)
  vehicleDecals: VehicleDecal[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
}
