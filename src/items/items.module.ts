/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Item } from './entities/item.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Item])],
  controllers: [ItemsController],
  providers: [ItemsService, AuthService, JwtService],
})
export class ItemsModule {}
