import { Module } from '@nestjs/common';
import { ServiceTagsService } from './service-tags.service';
import { ServiceTagsController } from './service-tags.controller';
import { BlockServiceTagsController } from './blocks-service-tags.controller';
import { BlockServiceTagsService } from './blocks-service-tags.service';

@Module({
  controllers: [ServiceTagsController, BlockServiceTagsController],
  providers: [ServiceTagsService, BlockServiceTagsService],
})
export class ServiceTagsModule {}
