import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getLogin(): string {
    return 'login page';
  }

  postUser(): object {
    return {
      username: 'lucasjstn',
      password: '192810',
    };
  }
}
