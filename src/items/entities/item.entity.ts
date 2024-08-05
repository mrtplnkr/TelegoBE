/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { User } from './user.entity';

@Entity()
export class Item extends AbstractEntity<Item> {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  text: string;
  @Column()
  done: boolean;
  
  @ManyToOne(() => User, (user) => user.items, { cascade: true, createForeignKeyConstraints: true })
  user: User;
  @Column({ type: 'int', nullable: true })
  userId?: number | null
}
