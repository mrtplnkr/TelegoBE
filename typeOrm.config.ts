import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Item } from './src/items/entities/item.entity';
import { User } from 'src/items/entities/user.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'sqlite',
  database: configService.getOrThrow('DATABASE_FILE'),
  migrations: ['migrations/**'],
  entities: [User, Item],
});
