import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * method to test working of server
   * @returns test string
   */
  @Get('ping')
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * method to test working of server
   * @returns test string
   */
  @Get('test')
  getSample(): string {
    return this.appService.getHello();
  }
}
