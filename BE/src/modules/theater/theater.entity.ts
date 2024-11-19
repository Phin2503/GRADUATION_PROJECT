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

  @OneToMany(() => Showtime, (Showtime) => Showtime.theater)
  showtime: Showtime[];

  @ManyToOne(() => TheaterComplex, (TheaterComplex) => TheaterComplex.theaters)
  theater_complex: TheaterComplex;

  @OneToMany(() => Seat, (Seat) => Seat.theater)
  seats: Seat[];

  @OneToMany(() => Order, (Order) => Order.theater)
  orders: Order[];
}
