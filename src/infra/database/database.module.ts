import { Module } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories/notifications/notificationsRepository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { PrismaNotificationsRepository } from '@infra/database/prisma/repositories/notifications/prismaNotificationsRepository';

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
