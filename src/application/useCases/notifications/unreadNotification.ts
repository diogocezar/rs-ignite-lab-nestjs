import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories/notifications/notificationsRepository';
import { NotificationNotFoundError } from '@application/useCases/errors/notifications/notificationNotFoundError';

export interface UnreadNotificationInput {
  id: string;
}

export type UnreadNotificationOutput = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}
  async execute(
    input: UnreadNotificationInput,
  ): Promise<UnreadNotificationOutput> {
    const { id } = input;
    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
