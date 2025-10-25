import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from 'src/services/dto/create-service.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('service-tags/:serviceTagId/services')
@ApiTags('Services')
export class ServiceTagsServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiOperation({
    summary: 'Создание услуги',
  })
  @ApiBody({ type: CreateServiceDto })
  @ApiResponse({
    type: CreateServiceDto,
  })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Поиск услуг по тегу',
  })
  @ApiBody({ type: CreateServiceDto })
  @ApiResponse({
    type: CreateServiceDto,
    isArray: true
  })
  findAll() {
    return this.servicesService.findAll();
  }
}
