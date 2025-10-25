import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceTagDto } from 'src/service-tags/dto/create-service-tag.dto';
import { UpdateServiceTagDto } from 'src/service-tags/dto/update-service-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServiceTagsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(blockId: number, createServiceTagDto: CreateServiceTagDto) {
    const block = await this.prisma.block.findUnique({
      where: { id: blockId },
      select: { id: true },
    });
    if (!block) throw new NotFoundException('Block not found');

    return await this.prisma.serviceTag.create({
      data: { ...createServiceTagDto, blockId },
    });
  }

  findAll(blockId: number) {
    return this.prisma.serviceTag.findMany({
      where: { blockId },
      orderBy: { id: 'desc' },
    });
  }

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
