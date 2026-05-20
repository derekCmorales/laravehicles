import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'historial_vehiculo' })
export class VehicleHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json', name: 'datos_anteriores', nullable: true })
  datosAnteriores: Record<string, any>;

  @Column({ type: 'json', name: 'datos_nuevos', nullable: true })
  datosNuevos: Record<string, any>;

  @Column({ type: 'varchar', length: 100, name: 'tipo_cambio', nullable: false })
  tipoCambio: string;

  @ManyToOne(() => Vehicle, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'placa', referencedColumnName: 'placa' })
  vehicle: Vehicle;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'idUsuario' })
  adminUser: User;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_cambio' })
  fechaCambio: Date;
}
