import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Theater } from '../theater/theater.entity';

@Entity()
export class TypeTheater {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Theater, (Theater) => Theater.typeTheater)
  theater: Theater[];
}
