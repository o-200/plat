import { Controller, Body, Patch, Param, Delete, Get } from '@nestjs/common';
import { ServiceTagsService } from './service-tags.service';
import { UpdateServiceTagDto } from './dto/update-service-tag.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('service-tags')
@ApiTags('ServiceTags')
export class ServiceTagsController {
  constructor(private readonly serviceTagsService: ServiceTagsService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Поиск тега по идентификатору',
  })
  @ApiResponse({
    type: UpdateServiceTagDto,
  })
  findOne(@Param('id') id: string) {
    return this.serviceTagsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Обновление тега',
  })
  @ApiBody({ type: UpdateServiceTagDto })
  @ApiResponse({
    type: UpdateServiceTagDto,
    isArray: true,
  })
  update(
    @Param('id') id: string,
    @Body() updateServiceTagDto: UpdateServiceTagDto,
  ) {
    return this.serviceTagsService.update(+id, updateServiceTagDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Удаление тега',
  })
  remove(@Param('id') id: string) {
    return this.serviceTagsService.remove(+id);
  }
}
