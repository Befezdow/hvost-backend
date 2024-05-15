import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthorizedRequest } from 'src/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() requestDto: Record<string, any>,
    @Res() response: Response,
  ) {
    const { token, expiresAt } = await this.authService.signIn(
      requestDto.login,
      requestDto.password,
    );
    const result = { accessToken: token, expiresAt: expiresAt.toISOString() };
    return response.status(HttpStatus.OK).json(result);
  }

  @Get('profile')
  getProfile(@Req() req: AuthorizedRequest) {
    return req.user;
  }
}
