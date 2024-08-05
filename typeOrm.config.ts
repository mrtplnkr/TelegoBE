import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Item } from './src/items/entities/item.entity';
import { User } from 'src/items/entities/user.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'sqlite',
  // host: configService.getOrThrow('MYSQL_HOST'),
  // port: configService.getOrThrow('MYSQL_PORT'),
  database: './todo.db', //configService.getOrThrow('MYSQL_DATABASE')
  // username: configService.getOrThrow('MYSQL_USERNAME'),
  // password: configService.getOrThrow('MYSQL_PASSWORD'),
  migrations: ['migrations/**'],
  entities: [User, Item],
});
