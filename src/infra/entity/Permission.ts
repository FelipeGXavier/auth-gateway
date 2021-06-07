import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'permission' })
export default class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  target: string;

  @Column()
  action: string;

  @Column()
  flag: boolean;
}
