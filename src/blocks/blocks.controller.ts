import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('blocks')
@ApiTags('Blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Post()
  @ApiOperation({
    summary: 'Создание блока.',
    description: `Создание блока, который содержит внутри себя другие элементы.
      тип CONTENT используется для хранения постов;
      тип SERVICE используется для хранения тегов услуг;
    `,
  })
  @ApiBody({ type: CreateBlockDto })
  @ApiCreatedResponse({
    type: CreateBlockDto,
  })
  create(@Body() createBlockDto: CreateBlockDto) {
    return this.blocksService.create(createBlockDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Список блоков',
  })
  @ApiBody({ type: CreateBlockDto })
  @ApiResponse({
    type: CreateBlockDto,
    isArray: true,
  })
  findAll() {
    return this.blocksService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Поиск блока по ID',
  })
  @ApiBody({ type: CreateBlockDto })
  @ApiResponse({ type: CreateBlockDto })
  findOne(@Param('id') id: string) {
    return this.blocksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление блока' })
  @ApiBody({ type: UpdateBlockDto })
  @ApiResponse({ type: UpdateBlockDto })
  update(@Param('id') id: string, @Body() updateBlockDto: UpdateBlockDto) {
    return this.blocksService.update(+id, updateBlockDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удаление тега',
  })
  remove(@Param('id') id: string) {
    return this.blocksService.remove(+id);
  }
}
