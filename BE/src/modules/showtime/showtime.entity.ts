import { Movie } from 'src/modules/movie/movie.entity';
import { Theater } from 'src/modules/theater/theater.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Order } from '../order/order.entity';
import { STATUS_ORDER } from '../enumTypes/status_order/status_order.enum';

@Entity()
export class Showtime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'datetime',
  })
  showtime_start: Date;

  @Column({
    nullable: false,
    type: 'datetime',
  })
  showtime_end: Date;

  @CreateDateColumn({
    type: 'datetime',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
  })
  update_at: Date;

  @Column({
    type: 'enum',
    enum: STATUS_ORDER,
    default: STATUS_ORDER.PENDING,
  })
  order_status: STATUS_ORDER;

  @ManyToOne(() => Movie, (movie) => movie.showtime)
  movie: Movie;

  @ManyToOne(() => Theater, (theater) => theater.showtime)
  theater: Theater;

  @OneToMany(() => Order, (Order) => Order.showtime)
  order: Order[];
}
