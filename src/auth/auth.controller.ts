/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { Tokens } from './types/token.type';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signin')
  async signin(@Body() dto: AuthDto): Promise<Tokens> {
    return await this.authService.signin(dto);
  }
}
