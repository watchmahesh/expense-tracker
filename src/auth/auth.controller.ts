import { Controller, Post, Body, UseGuards, Request, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';
import { JwtAuthGuard } from './jwtAuthGuard';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    let result;
    if (body.refreshToken) {
      result = await this.authService.refreshAccessToken(body.refreshToken);
    } else {
      result = await this.authService.login(body.username, body.password);
    }
    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
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
