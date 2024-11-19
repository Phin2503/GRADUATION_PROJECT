import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SEAT_STATUS } from '../enumTypes/seat_status/seat_status.enum';
import { User } from '../user/user.entity';

import { Showtime } from '../showtime/showtime.entity';
import { Seat } from '../seat/seat.entity';
import { Theater } from '../theater/theater.entity';
import { Food } from '../food/food.entity';
import { STATUS_ORDER } from '../enumTypes/status_order/status_order.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  reserved_at: Date;

  @Column({
    type: 'enum',
    enum: STATUS_ORDER,
    default: STATUS_ORDER.PENDING,
  })
  status: STATUS_ORDER;

  @Column('json')
  seats: string[];

  @Column('json')
  foods: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price: number;

  @ManyToOne(() => Showtime, (showtime) => showtime.order)
  showtime: Showtime;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @ManyToOne(() => Theater, (Theater) => Theater.orders)
  theater: Theater;
}
