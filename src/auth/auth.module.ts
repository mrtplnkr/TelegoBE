/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/items/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Item } from 'src/items/entities/item.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Item])],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
