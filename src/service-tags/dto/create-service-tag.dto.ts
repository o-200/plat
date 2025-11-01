import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateServiceTagDto {
  @ApiProperty({
    description:
      'Название тега услуги. Пример - Дом и ЖКУ, Связь и телефоны...',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Ссылка на изображение',
  })
  @IsUrl()
  @IsOptional()
  @IsNotEmpty()
  imageLink: string;

  @ApiProperty({
    description: `Номер приоритета. Необходимо для показа блоков (GET запросы) исходя из этого поля. Чем меньше значение - тем больше приоритет.
    Если не заполнено - присуждается автоматически низший приоритет.
    `,
  })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  priority?: number;

  @ApiProperty({
    description: 'Идентификатор Блока',
  })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  blockId: number;
}
