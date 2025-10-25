import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceTagDto {
  @ApiProperty({
    description:
      'Название тега услуги. Пример - Дом и ЖКУ, Связь и телефоны...',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;
}
