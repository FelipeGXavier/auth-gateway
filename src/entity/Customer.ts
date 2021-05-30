import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import Subscription from './Subscription';

@Entity({ name: 'customer' })
export default class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  cpf: string;

  @Column()
  birth: Date;

  @ManyToMany(() => Subscription)
  @JoinTable({
    name: 'customer_subscription',
    joinColumn: {
      name: 'customer_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'sub_id',
      referencedColumnName: 'id',
    },
  })
  subscriptions: Subscription[];
}
