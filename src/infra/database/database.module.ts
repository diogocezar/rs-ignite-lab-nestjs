import { Module } from '@nestjs/common';
import { NotificationsRepository } from 'src/application/repositories/notifications/notificationsRepository';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { PrismaNotificationsRepository } from './prisma/repositories/notifications/prismaNotificationsRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
