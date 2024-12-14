import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column('decimal')
  discount: number;

  @Column()
  expiryDate: Date;

  @OneToMany(() => Order, (order) => order.coupon)
  order_Id: Order;
}
