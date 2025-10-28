import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

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
    description: 'Идентификатор Блока',
  })
  @IsNotEmpty()
  blockId: number;
}
