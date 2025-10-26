import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceTagDto } from './dto/create-service-tag.dto';
import { UpdateServiceTagDto } from './dto/update-service-tag.dto';
import { PrismaService } from '../prisma/prisma.service'; // relative to avoid alias issues

@Injectable()
export class BlockServiceTagsService {
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
