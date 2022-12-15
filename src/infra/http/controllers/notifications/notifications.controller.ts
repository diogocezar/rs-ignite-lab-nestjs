import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '@application/useCases/notifications/sendNotification';
import { CreateNotificationBody } from '@infra/http/dtos/notifications/createNotificationBody';
import { HttpNotificationMapper } from '@infra/http/mappers/httpNotificationMapper';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}
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
