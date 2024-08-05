/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { Item } from './item.entity';

@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => Item, (user) => user.users)
  items: Item[];
}
