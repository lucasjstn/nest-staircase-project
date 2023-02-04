import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserSchema } from './model/user.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/login')
  getLogin(): string {
    return this.appService.getLogin();
  }
}
