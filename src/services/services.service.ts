import { Injectable } from '@nestjs/common';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from '../prisma/prisma.service'; // relative to avoid alias issues

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.service.findMany();
  }

  findOne(id: number) {
    return this.prisma.service.findUnique({
      where: { id },
    });
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  remove(id: number) {
    return this.prisma.service.delete({ where: { id } });
  }
}
