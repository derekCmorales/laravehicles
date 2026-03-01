import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity({ name: 'catalogo_iscv' })
export class Catalog {
  @PrimaryColumn({ type: 'varchar', length: 30, name: 'codigo_iscv' })
  codigoISCV: string;

  @Column({ type: 'varchar', length: 100, name: 'marca', nullable: false })
  marca: string;

  @Column({ type: 'varchar', length: 100, name: 'linea_estilo', nullable: false })
  lineaEstilo: string;

  @Column({ type: 'varchar', length: 50, name: 'tipo_vehiculo', nullable: false })
  tipoVehiculo: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'valor_base', nullable: false })
  valorBase: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_actualizacion' })
  fechaActualizacion: Date;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.catalog)
  vehicles: Vehicle[];
}
