import { Test, TestingModule } from '@nestjs/testing';
import { BlockServiceTagsController } from './block-service-tags.controller';
import { BlockServiceTagsService } from './block-service-tags.service';
import { CreateServiceTagDto } from './dto/create-service-tag.dto';

describe('BlockServiceTagsController', () => {
  let controller: BlockServiceTagsController;
  let service: BlockServiceTagsService;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
  } as unknown as BlockServiceTagsService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlockServiceTagsController],
      providers: [{ provide: BlockServiceTagsService, useValue: serviceMock }],
    }).compile();

    controller = module.get(BlockServiceTagsController);
    service = module.get(BlockServiceTagsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('delegates to service and returns result', async () => {
      const blockId = 10;
      const dto: CreateServiceTagDto = { title: 'Дом и ЖКУ' } as any;
      const created = { id: 1, title: dto.title, blockId };

      (service.create as jest.Mock).mockResolvedValue(created);

      const res = await controller.create(blockId, dto);

      expect(service.create).toHaveBeenCalledWith(blockId, dto);
      expect(res).toEqual(created);
    });
  });

  describe('findAll', () => {
    it('returns list for block', async () => {
      const blockId = 11;
      const list = [{ id: 2, title: 'Связь', blockId }];
      (service.findAll as jest.Mock).mockResolvedValue(list);

      const res = await controller.findAll(blockId);

      expect(service.findAll).toHaveBeenCalledWith(blockId);
      expect(res).toEqual(list);
    });
  });
});
