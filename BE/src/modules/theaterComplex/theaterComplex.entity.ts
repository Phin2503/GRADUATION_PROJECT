import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Theater } from '../theater/theater.entity';
import { Showtime } from '../showtime/showtime.entity';

@Entity()
export class TheaterComplex {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: false,
  })
  location: string;

  @Column({
    nullable: false,
  })
  address: string;

  @Column({
    nullable: false,
  })
  province: string;

  @Column({
    nullable: false,
  })
  district: string;

  @OneToMany(() => Theater, (theater) => theater.theater_complex)
  theaters: Theater[];

  @OneToMany(() => Showtime, (showtime) => showtime.theater_complex)
  showtimes: Showtime[];
}
