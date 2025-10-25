import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateServiceDto {
  @ApiProperty({
    description:
      'Название услуги. Пример - Пополнение баланса, показания счётчиков...',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;
}
