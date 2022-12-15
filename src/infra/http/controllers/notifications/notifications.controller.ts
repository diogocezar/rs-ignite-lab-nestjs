import { Body, Controller, Post, Patch, Param, Get } from '@nestjs/common';
import { SendNotification } from '@application/useCases/notifications/sendNotification';
import { CreateNotificationBody } from '@infra/http/dtos/notifications/createNotificationBody';
import { HttpNotificationMapper } from '@infra/http/mappers/httpNotificationMapper';
import { CancelNotification } from '@application/useCases/notifications/cancelNotification';
import { ReadNotification } from '@application/useCases/notifications/readNotification';
import { UnreadNotification } from '@application/useCases/notifications/unreadNotification';
import { CountRecipientNotification } from '@application/useCases/notifications/countRecipientNotification';
import { GetRecipientNotification } from '@application/useCases/notifications/getRecipientNotification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotification,
    private getRecipientNotifications: GetRecipientNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('id') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });
    return {
      count,
    };
  }

  @Get('get/from/:recipientId')
  async getFromRecipient(@Param('id') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });
    return {
      notifications: notifications.map(HttpNotificationMapper.toHttp),
    };
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    await this.readNotification.execute({ id });
  }

  @Patch(':id/unread')
  async markAsUnread(@Param('id') id: string) {
    await this.unreadNotification.execute({ id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body;
    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return {
      notification: HttpNotificationMapper.toHttp(notification),
    };
  }
}
