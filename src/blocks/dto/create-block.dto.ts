import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { $Enums } from '@prisma/client';

export class CreateBlockDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsEnum($Enums.Kind)
  kind?: $Enums.Kind;
}
