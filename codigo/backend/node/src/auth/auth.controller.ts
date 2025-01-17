import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { GetUser } from './get-user.decorator';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ReturnUserDto } from 'src/users/dto/return-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
    @Res() response: Response,
  ): Promise<ReturnUserDto> {
    const { user, cookie } = await this.authService.signIn(credentiaslsDto);
    response.status(200);
    response.setHeader('Set-Cookie', cookie);
    response.send({ user });
    return { user };
  }

  @Get('/me')
  @ApiCookieAuth()
  @UseGuards(AuthGuard())
  getMe(@GetUser() user: User): User {
    return user;
  }

  @UseGuards(AuthGuard())
  @Post('logout')
  @ApiCookieAuth()
  async logOut(@Res() response: Response): Promise<boolean> {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    response.send(true);
    return true;
  }
}
