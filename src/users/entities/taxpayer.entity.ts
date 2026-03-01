import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Profile } from './profile.entity';

@Entity({ name: 'contribuyente' })
export class Taxpayer {
  @PrimaryGeneratedColumn({ name: 'id_contribuyente' })
  idContribuyente: number;

  @Column({ type: 'varchar', length: 20, unique: true, name: 'nit', nullable: false })
  NIT: string;

  @Column({ type: 'varchar', length: 20, unique: true, name: 'cui', nullable: false })
  CUI: string;

  @Column({ type: 'varchar', length: 50, name: 'nombre_empresa', nullable: true })
  nombreEmpresa: string;

  @Column({ type: 'varchar', length: 50, name: 'domicilio_fiscal', nullable: false })
  domicilioFiscal: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_actualizacion' })
  fechaActualizacion: Date;

  // 1:1 con profile not yet
  @OneToOne(() => Profile, (profile) => profile.taxpayer, { nullable: false, cascade: true })
  @JoinColumn({ name: 'id_perfil' })
  profile: Profile;
}
