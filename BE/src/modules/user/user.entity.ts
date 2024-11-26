import { Exclude } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

import { ROLES } from 'src/modules/enumTypes/roles/roles.enum';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 155,
    update: true,
  })
  @Exclude()
  password: string;

  @Column({
    length: 30,
  })
  fullName: string;

  @Column({
    length: 50,
    unique: true,
  })
  email: string;

  @Column({ type: Date })
  @IsDate()
  dateOfBirth: Date;

  @Column({
    length: 20,
    unique: true,
  })
  phoneNumber: string;

  @Column({
    update: false,
  })
  createAt: Date;

  @Column()
  @IsOptional()
  @UpdateDateColumn()
  updateAt: Date;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column({ default: ROLES.USER })
  role: ROLES;

  @Column({
    type: 'boolean',
    default: false,
  })
  isVerify: boolean;

  @OneToMany(() => Order, (Order) => Order.user)
  order: Order[];
}
