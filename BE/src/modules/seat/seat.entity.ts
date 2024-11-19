import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Theater } from '../theater/theater.entity';
import { SEAT_TYPE } from '../enumTypes/seat_type/seat_type.enum';
import { Order } from '../order/order.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  seat_id: number;

  @Column({
    nullable: false,
    length: 10,
    unique: true,
  })
  seat_number: string;

  @Column({
    type: 'enum',
    enum: SEAT_TYPE,
    default: SEAT_TYPE.REGULAR,
  })
  seat_type: SEAT_TYPE;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToOne(() => Theater, (Theater) => Theater.seats)
  theater: Theater;

  // @OneToMany(() => Order, (Order) => Order.seat)
  // order: Order[];
}
