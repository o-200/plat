import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateServiceTagDto } from 'src/service-tags/dto/create-service-tag.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { ServiceTagsService } from './service-tags.service';

@Controller('blocks/:blockId/service-tags')
export class ServiceTagsController {
  constructor(private readonly serviceTagsService: ServiceTagsService) {}

  @Post()
  @ApiParam({ name: 'blockId', type: Number })
  @Post()
  @ApiOperation({
    summary: 'Создание тега сервиса.',
    description: `Создание тега для сервиса, являясь общим названием для списка услуг. Пример - Дом и ЖКУ, Связь и телефоны;
    `,
  })
  @ApiBody({ type: CreateServiceTagDto })
  @ApiCreatedResponse({
    type: CreateServiceTagDto,
  })
  create(
    @Param('blockId', ParseIntPipe) blockId: number,
    @Body() createServiceTagDto: CreateServiceTagDto,
  ) {
    return this.serviceTagsService.create(blockId, createServiceTagDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Список тегов по блоку',
  })
  @ApiBody({ type: CreateServiceTagDto })
  @ApiResponse({
    type: CreateServiceTagDto,
    isArray: true,
  })
  @ApiParam({ name: 'blockId', type: Number })
  findAll(@Param('blockId', ParseIntPipe) blockId: number) {
    return this.serviceTagsService.findAll(blockId);
  }
}
