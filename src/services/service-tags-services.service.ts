import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServiceTagServicesService {
  // ? naming sucks
  constructor(private readonly prisma: PrismaService) {}
  async create(serviceTagId: number, createServiceDto: CreateServiceDto) {
    const serviceTag = await this.prisma.block.findUnique({
      where: { id: serviceTagId },
      select: { id: true },
    });
    if (!serviceTag) throw new NotFoundException('Service Tag not found');

    return await this.prisma.service.create({
      data: { ...createServiceDto, serviceTagId },
    });
  }

  findAll(serviceTagId: number) {
    return this.prisma.service.findMany({
      where: { id: serviceTagId },
      orderBy: { id: 'desc' },
    });
  }
}
