import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { STATUS_PAYMENT } from '../enumTypes/status_payment/status_payment';
import { Order } from '../order/order.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  method: string;

  @Column()
  status: string;

  @ManyToOne(() => Order, (order) => order.payments, { nullable: false })
  order: Order;
}
