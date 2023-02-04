import { User } from 'src/model/user.schema';
import { UsersService } from './user.service';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

@Controller()
export class UsersController {
  constructor(
    private readonly userService: UsersService, // private jwtService: JwtService,
  ) {}

  @Post('/signup')
  async Signup(@Res() response, @Body() user: User) {
    const newUser = await this.userService.signup(user);
    return response.status(HttpStatus.CREATED).json({
      newUser,
    });
  }
}
