import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FindByBlockServiceTagsDto {
  @ApiProperty({
    description: 'Идентификатор Блока',
  })
  @IsNotEmpty()
  blockId: number;
}
