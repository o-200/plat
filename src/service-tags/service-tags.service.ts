import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateServiceTagDto } from './dto/update-service-tag.dto';
import { PrismaService } from '../prisma/prisma.service'; // relative to avoid alias issues
import { CreateServiceTagDto } from './dto/create-service-tag.dto';
import { BlockKind } from '@prisma/client';

@Injectable()
export class ServiceTagsService {
  constructor(private readonly prisma: PrismaService) {}

  findByBlock(blockId: number) {
    return this.prisma.serviceTag.findMany({
      where: { blockId: blockId },
      orderBy: { id: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.serviceTag.findUnique({
      where: { id },
    });
  }

  async create(createServiceTagDto: CreateServiceTagDto) {
    const block = await this.prisma.block.findUnique({
      where: { id: createServiceTagDto.blockId }
    });

    if (!block) throw new NotFoundException('Block not found');
    if (block.kind !== BlockKind.SERVICE) throw new BadRequestException('Block is not SERVICE');

    return await this.prisma.serviceTag.create({
      data: { ...createServiceTagDto },
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
