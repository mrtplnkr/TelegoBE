/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Item } from './entities/item.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/strategies/JwtStrategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Item]),
    JwtModule.register({
      secret: `${process.env.MY_SECRET}`,
      signOptions: { expiresIn: '55m' },
    }),
  ],
  controllers: [ItemsController],
  providers: [ItemsService, AuthService, JwtService, JwtStrategy],
})
export class ItemsModule {}
