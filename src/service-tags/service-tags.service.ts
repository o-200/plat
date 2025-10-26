import { Injectable } from '@nestjs/common';
import { UpdateServiceTagDto } from './dto/update-service-tag.dto';
import { PrismaService } from '../prisma/prisma.service'; // relative to avoid alias issues

@Injectable()
export class ServiceTagsService {
  constructor(private readonly prisma: PrismaService) {}

  findOne(id: number) {
    return this.prisma.serviceTag.findUnique({
      where: { id },
    });
  }

  update(id: number, updateServiceTagDto: UpdateServiceTagDto) {
    return this.prisma.serviceTag.update({
      where: { id },
      data: updateServiceTagDto,
    });
  }

  remove(id: number) {
    return this.prisma.serviceTag.delete({ where: { id } });
  }
}
