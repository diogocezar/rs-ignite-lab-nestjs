import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories/notifications/notificationsRepository';
import { NotificationNotFoundError } from '@application/useCases/errors/notifications/notificationNotFoundError';

export interface CancelNotificationInput {
  id: string;
}

export type CancelNotificationOutput = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}
  async execute(
    input: CancelNotificationInput,
  ): Promise<CancelNotificationOutput> {
    const { id } = input;
    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
