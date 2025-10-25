import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServiceTagsServicesController } from './service-tags-services.controller';
import { ServiceTagServicesService } from './service-tags-services.service';

@Module({
  controllers: [ServicesController, ServiceTagsServicesController],
  providers: [ServicesService, ServiceTagServicesService],
})
export class ServicesModule {}
