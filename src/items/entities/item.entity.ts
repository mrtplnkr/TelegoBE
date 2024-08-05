import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { User } from './user.entity';

@Entity()
export class Item extends AbstractEntity<Item> {
  @Column()
  text: string;
  @Column()
  done: boolean;
  @ManyToOne(() => User, (user) => user.items)
  users: User[];
}
