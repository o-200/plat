import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { UpdateServiceDto } from './dto/update-service.dto';

describe('ServicesController', () => {
  let controller: ServicesController;
  let service: ServicesService;

  const serviceMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  } as unknown as ServicesService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController],
      providers: [{ provide: ServicesService, useValue: serviceMock }],
    }).compile();

    controller = module.get(ServicesController);
    service = module.get(ServicesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('returns list', async () => {
      (service.findAll as jest.Mock).mockResolvedValue([{ id: 1 }]);

      const res = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(res).toEqual([{ id: 1 }]);
    });
  });

  describe('findOne', () => {
    it('parses id and delegates', async () => {
      (service.findOne as jest.Mock).mockResolvedValue({ id: 2 });

      const res = await controller.findOne('2');

      expect(service.findOne).toHaveBeenCalledWith(2);
      expect(res).toEqual({ id: 2 });
    });
  });

  describe('update', () => {
    it('parses id and passes dto', async () => {
      const dto: UpdateServiceDto = { title: 'x' } as any;
      (service.update as jest.Mock).mockResolvedValue({ id: 3, title: 'x' });

      const res = await controller.update('3', dto);

      expect(service.update).toHaveBeenCalledWith(3, dto);
      expect(res).toEqual({ id: 3, title: 'x' });
    });
  });

  describe('remove', () => {
    it('parses id and delegates', async () => {
      (service.remove as jest.Mock).mockResolvedValue({ id: 4 });

      const res = await controller.remove('4');

      expect(service.remove).toHaveBeenCalledWith(4);
      expect(res).toEqual({ id: 4 });
    });
  });
});
