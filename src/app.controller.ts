import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({
    summary: 'Проверки работоспособности сервиса.',
    description:
      `Тестовый endpoint для проверки работы сервиса. Всегда возвращает 200 ОК и тело "Hello, World!"`,
    })
  @ApiResponse({
    type: "Hello, World!",
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
