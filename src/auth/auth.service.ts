/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/items/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types/token.type';
import { JwtPayload } from './types/jwtPayload.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signin(dto: AuthDto): Promise<Tokens> {
    const user = await this.usersRepository.findOne({
      where: {
        email: dto.email,
        password: dto.password
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);

    return tokens;
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('MY_SECRET'),
        expiresIn: '15m',
      }),
    ]);

    return {
      access_token: at,
    };
  }
}
