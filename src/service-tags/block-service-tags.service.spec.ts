import { Test, TestingModule } from '@nestjs/testing';
import { BlockServiceTagsService } from './block-service-tags.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('BlockServiceTagsService', () => {
  let service: BlockServiceTagsService;

  const prismaMock = {
    block: { findUnique: jest.fn() },
    serviceTag: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  } as unknown as PrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlockServiceTagsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<BlockServiceTagsService>(BlockServiceTagsService);
  });

  describe('create', () => {
    it('creates a tag when block exists', async () => {
      (prismaMock.block.findUnique as jest.Mock).mockResolvedValue({ id: 10 });
      (prismaMock.serviceTag.create as jest.Mock).mockResolvedValue({
        id: 1,
        title: 't1',
        blockId: 10,
      });

      const dto = { title: 't1' };
      const res = await service.create(10, dto as any);

      expect(prismaMock.block.findUnique).toHaveBeenCalledWith({
        where: { id: 10 },
        select: { id: true },
      });
      expect(prismaMock.serviceTag.create).toHaveBeenCalledWith({
        data: { ...dto, blockId: 10 },
      });
      expect(res).toEqual({ id: 1, title: 't1', blockId: 10 });
    });

    it('throws NotFoundException when block missing', async () => {
      (prismaMock.block.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.create(99, { title: 'x' } as any)).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(prismaMock.serviceTag.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('returns tags for block ordered desc by id', async () => {
      const rows = [{ id: 3 }, { id: 2 }];
      (prismaMock.serviceTag.findMany as jest.Mock).mockResolvedValue(rows);

      const res = await service.findAll(10);

      expect(prismaMock.serviceTag.findMany).toHaveBeenCalledWith({
        where: { blockId: 10 },
        orderBy: { id: 'desc' },
      });
      expect(res).toBe(rows);
    });
  });

  describe('findOne', () => {
    it('returns a tag by id', async () => {
      (prismaMock.serviceTag.findUnique as jest.Mock).mockResolvedValue({ id: 5 });

      const res = await service.findOne(5);

      expect(prismaMock.serviceTag.findUnique).toHaveBeenCalledWith({
        where: { id: 5 },
      });
      expect(res).toEqual({ id: 5 });
    });
  });

  describe('update', () => {
    it('updates a tag', async () => {
      (prismaMock.serviceTag.update as jest.Mock).mockResolvedValue({
        id: 7,
        title: 'upd',
      });

      const res = await service.update(7, { title: 'upd' } as any);

      expect(prismaMock.serviceTag.update).toHaveBeenCalledWith({
        where: { id: 7 },
        data: { title: 'upd' },
      });
      expect(res).toEqual({ id: 7, title: 'upd' });
    });
  });

  describe('remove', () => {
    it('deletes a tag', async () => {
      (prismaMock.serviceTag.delete as jest.Mock).mockResolvedValue({ id: 8 });

      const res = await service.remove(8);

      expect(prismaMock.serviceTag.delete).toHaveBeenCalledWith({
        where: { id: 8 },
      });
      expect(res).toEqual({ id: 8 });
    });
  });
});
