import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlocksModule } from './blocks/blocks.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, BlocksModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [PrismaModule]
})
export class AppModule {}
