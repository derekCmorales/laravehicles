import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Taxpayer } from './taxpayer.entity';

@Entity({ name: 'perfil' })
export class Profile {
  @PrimaryGeneratedColumn({ name: 'id_perfil' })
  idPerfil: number;

  @Column({ type: 'varchar', length: 50, name: 'primer_nombre', nullable: false })
  primerNombre: string;

  @Column({ type: 'varchar', length: 50, name: 'segundo_nombre', nullable: true })
  segundoNombre: string;

  @Column({ type: 'varchar', length: 50, name: 'primer_apellido', nullable: false })
  primerApellido: string;

  @Column({ type: 'varchar', length: 50, name: 'segundo_apellido', nullable: true })
  segundoApellido: string;

  @Column({ type: 'date', name: 'fecha_nacimiento', nullable: false })
  fechaNacimiento: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'fecha_actualizacion' })
  fechaActualizacion: Date;

  // 1:1 con user
  @OneToOne(() => User, (user) => user.profile, { nullable: false, cascade: true })
  @JoinColumn({ name: 'id_usuario' })
  user: User;

  // 1:1 con taxpayer/contribuyente
  @OneToOne(() => Taxpayer, (taxpayer) => taxpayer.profile)
  taxpayer: Taxpayer;
}
