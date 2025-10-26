import { Module } from '@nestjs/common';
import { ServiceTagsService } from './service-tags.service';
import { ServiceTagsController } from './service-tags.controller';
import { BlockServiceTagsController } from './block-service-tags.controller';
import { BlockServiceTagsService } from './block-service-tags.service';

@Module({
  controllers: [ServiceTagsController, BlockServiceTagsController],
  providers: [ServiceTagsService, BlockServiceTagsService],
})
export class ServiceTagsModule {}
