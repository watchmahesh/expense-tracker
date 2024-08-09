import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';
import { JwtAuthGuard } from './jwtAuthGuard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: User) {
    return this.authService.register(user);
  }



  @UseGuards(JwtAuthGuard)
  @Post('protected')
  getProfile(@Request() req) {
    return req.user;
  }
}
