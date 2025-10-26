import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { ServiceTagsServicesController } from './service-tag-services.controller';
import { ServiceTagServicesService } from './service-tag-services.service';

@Module({
  controllers: [ServicesController, ServiceTagsServicesController],
  providers: [ServicesService, ServiceTagServicesService],
})
export class ServicesModule {}
