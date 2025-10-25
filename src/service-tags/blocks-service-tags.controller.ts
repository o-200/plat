import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateServiceTagDto } from './dto/create-service-tag.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BlockServiceTagsService } from './blocks-service-tags.service';

@Controller('blocks/:blockId/service-tags')
@ApiTags('ServiceTags')
export class BlockServiceTagsController {
  constructor(
    private readonly blockServiceTagsService: BlockServiceTagsService,
  ) {}

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
    return this.blockServiceTagsService.create(blockId, createServiceTagDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Список тегов по блоку',
  })
  @ApiResponse({
    type: CreateServiceTagDto,
    isArray: true,
  })
  @ApiParam({ name: 'blockId', type: Number })
  findAll(@Param('blockId', ParseIntPipe) blockId: number) {
    return this.blockServiceTagsService.findAll(blockId);
  }
}
