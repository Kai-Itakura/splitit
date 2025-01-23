import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('🔥Welcome to Nest.js!');
    return 'Hello World!';
  }
}
