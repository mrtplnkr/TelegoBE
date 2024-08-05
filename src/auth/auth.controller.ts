/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Tokens } from './types/token.type';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signin')
  signin(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signin(dto);
  }
}