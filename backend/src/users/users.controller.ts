import { User } from 'src/model/user.schema';
import { UsersService } from './user.service';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Redirect,
  Res,
} from '@nestjs/common';

@Controller()
export class UsersController {
  constructor(
    private readonly userService: UsersService, // private jwtService: JwtService,
  ) {}

  @Post('/signup')
  @Redirect('/')
  async Signup(@Res() response, @Body() user: User) {
    try {
      const newUser = await this.userService.signup(user);
      return response.status(HttpStatus.CREATED).json({
        status: 'success',
        message: 'user created successfully',
      });
    } catch (error) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        status: 'fail',
        message: 'user already exists',
      });
    }
  }

  @Post('/signin')
  async Signin(@Res() response, @Body() user: User) {
    const token = await this.userService.signin(user);
    // console.log(token);
    if (token) {
      return response.status(HttpStatus.OK).json({
        // token,
      });
    }

    return response.status(HttpStatus.UNAUTHORIZED);
  }
}
