import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  title: string;

  @Column()
  main_img_url: string;

  @Column()
  sub_img_url: string;

  @Column({ type: 'text', nullable: true })
  content: string;
}
