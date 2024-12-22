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
import { TheaterComplex } from '../theaterComplex/theaterComplex.entity';
import { Seat } from '../seat/seat.entity';
import { Order } from '../order/order.entity';
import { TypeTheater } from '../type-theater/typeTheater.entity';

@Entity()
export class Theater {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  capacity: number;

  @CreateDateColumn({
    type: 'datetime',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
  })
  updated_at: Date;

  @ManyToOne(() => TheaterComplex, (theaterComplex) => theaterComplex.theaters)
  theater_complex: TheaterComplex;

  @OneToMany(() => Showtime, (showtime) => showtime.theater)
  showtime: Showtime[];

  @OneToMany(() => Seat, (seat) => seat.theater)
  seats: Seat[];

  @OneToMany(() => Order, (order) => order.theater)
  orders: Order[];

  @ManyToOne(() => TypeTheater, (TypeTheater) => TypeTheater.theater)
  typeTheater: TypeTheater;
}
