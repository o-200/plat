import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateServiceDto } from 'src/services/dto/create-service.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ServiceTagServicesService } from './service-tags-services.service';

@Controller('service-tags/:serviceTagId/services')
@ApiTags('Services')
export class ServiceTagsServicesController {
  constructor(
    private readonly serviceTagsServicesService: ServiceTagServicesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Создание услуги',
    description: 'Тип услуги. Пополнение баланса, показания счётчиков..'
  })
  @ApiBody({ type: CreateServiceDto })
  @ApiResponse({
    type: CreateServiceDto,
  })
  create(
    @Param('serviceTagId', ParseIntPipe) serviceTagId: number,
    @Body() createServiceDto: CreateServiceDto,
  ) {
    return this.serviceTagsServicesService.create(
      serviceTagId,
      createServiceDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Поиск услуг по тегу',
  })
  @ApiResponse({
    type: CreateServiceDto,
    isArray: true,
  })
  @ApiParam({ name: 'serviceTagId', type: Number })
  findAll(serviceTagId: number) {
    return this.serviceTagsServicesService.findAll(serviceTagId);
  }
}
