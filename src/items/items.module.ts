import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Item } from './entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Item])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
