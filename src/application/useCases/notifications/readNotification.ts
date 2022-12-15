import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories/notifications/notificationsRepository';
import { NotificationNotFoundError } from '@application/useCases/errors/notifications/notificationNotFoundError';

export interface ReadNotificationInput {
  id: string;
}

export type ReadNotificationOutput = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}
  async execute(input: ReadNotificationInput): Promise<ReadNotificationOutput> {
    const { id } = input;
    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
