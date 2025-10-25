import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('services')
@ApiTags('Services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @ApiOperation({
    summary: 'Список услуг',
  })
  @ApiBody({ type: CreateServiceDto })
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Поиск услуги по идентификатору',
  })
  @ApiResponse({
    type: CreateServiceDto,
  })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Обновление услуги',
  })
  @ApiBody({ type: UpdateServiceDto })
  @ApiResponse({
    type: UpdateServiceDto,
  })
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удаление услуги',
  })
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
