import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlocksModule } from './blocks/blocks.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServiceTagsModule } from './service-tags/service-tags.module';

@Module({
  imports: [PrismaModule, BlocksModule, ServiceTagsModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [PrismaModule]
})
export class AppModule {}
