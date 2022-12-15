import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notifications/notification';
import { NotificationsRepository } from '@application/repositories/notifications/notificationsRepository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { PrismaNotificationMapper } from '../../mappers/prismaNotificationMapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}
  save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<Notification | null> {
    // const notification = await this.prismaService.notification.findUnique({
    //   where: { id },
    // });
    // if (!notification) return null;
    // return notification;
    throw new Error('Method not implemented.');
  }
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.create({
      data: raw,
    });
  }
}
