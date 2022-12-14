import { Module } from '@nestjs/common';
import { AppController } from './infra/app.controller';
import { AppService } from './infra/app.service';
import { PrismaService } from './infra/prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
