/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { Item } from './item.entity';

@Entity()
export class User extends AbstractEntity<User> {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => Item, (user) => user.user, { createForeignKeyConstraints: true })
  items: Item[];
}
