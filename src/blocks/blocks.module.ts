import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { ServiceTagsModule } from './service-tags/service-tags.module';

@Module({
  controllers: [BlocksController],
  providers: [BlocksService],
  imports: [ServiceTagsModule],
})
export class BlocksModule {}
