import { Showtime } from 'src/modules/showtime/showtime.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Genre } from '../genre/genre.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    length: 100,
    unique: true,
  })
  title: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  showing: boolean;

  @Column({
    type: 'varchar',
    length: 3000,
  })
  description: string;

  @Column()
  duration: number;

  @Column({
    nullable: false,
    type: 'date',
  })
  release_date: Date;

  @CreateDateColumn({
    nullable: false,
    type: 'datetime',
  })
  created_at: Date;

  @UpdateDateColumn({
    nullable: false,
    type: 'datetime',
  })
  updated_at: Date;

  @OneToMany(() => Showtime, (Showtime) => Showtime.movie)
  showtime: Showtime[];

  @ManyToOne(() => Genre, (Genre) => Genre.movie)
  genre: Genre;

  @Column()
  background_image_url: string;
}
