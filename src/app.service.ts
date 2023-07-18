import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * method to test if the server is working
   * @returns a test string
   */
  getHello(): string {
    return 'Hello world!';
  }
}
