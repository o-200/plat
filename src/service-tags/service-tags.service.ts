import { Injectable } from '@nestjs/common';
import { CreateServiceTagDto } from './dto/create-service-tag.dto';
import { UpdateServiceTagDto } from './dto/update-service-tag.dto';

@Injectable()
export class ServiceTagsService {
  create(createServiceTagDto: CreateServiceTagDto) {
    return 'This action adds a new serviceTag';
  }

  findAll() {
    return `This action returns all serviceTags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceTag`;
  }

  update(id: number, updateServiceTagDto: UpdateServiceTagDto) {
    return `This action updates a #${id} serviceTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceTag`;
  }
}
