// src/services-of-tag/services-of-tag.service.spec.ts
import { Test } from '@nestjs/testing';
import { ServiceTagServicesService } from './service-tag-services.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('ServiceTagServicesService', () => {
  let service: ServiceTagServicesService;

  const prismaMock = {
    serviceTag: { findUnique: jest.fn() },
    service: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  } as unknown as PrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const mod = await Test.createTestingModule({
      providers: [
        ServiceTagServicesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();
    service = mod.get(ServiceTagServicesService);
  });

  describe('create', () => {
    it('creates when serviceTag exists', async () => {
      (prismaMock.serviceTag.findUnique as jest.Mock).mockResolvedValue({ id: 9 });
      (prismaMock.service.create as jest.Mock).mockResolvedValue({
        id: 1, title: 'x', serviceTagId: 9,
      });

      const dto = { title: 'x' } as any;
      const res = await service.create(9, dto);

      expect(prismaMock.serviceTag.findUnique).toHaveBeenCalledWith({
        where: { id: 9 }, select: { id: true },
      });
      expect(prismaMock.service.create).toHaveBeenCalledWith({
        data: { ...dto, serviceTagId: 9 },
      });
      expect(res).toEqual({ id: 1, title: 'x', serviceTagId: 9 });
    });

    it('throws when serviceTag missing', async () => {
      (prismaMock.serviceTag.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.create(404, { title: 'x' } as any))
        .rejects.toBeInstanceOf(NotFoundException);
      expect(prismaMock.service.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('lists by serviceTagId desc', async () => {
      (prismaMock.service.findMany as jest.Mock).mockResolvedValue([{ id: 2 }, { id: 1 }]);

      const res = await service.findAll(7);

      expect(prismaMock.service.findMany).toHaveBeenCalledWith({
        where: { serviceTagId: 7 },
        orderBy: { id: 'desc' },
      });
      expect(res).toEqual([{ id: 2 }, { id: 1 }]);
    });
  });
});
