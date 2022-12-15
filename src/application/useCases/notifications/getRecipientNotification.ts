import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories/notifications/notificationsRepository';
import { Notification } from '@application/entities/notifications/notification';

export interface GetRecipientNotificationInput {
  recipientId: string;
}

export interface GetRecipientNotificationOutput {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotification {
  constructor(private notificationRepository: NotificationsRepository) {}
  async execute(
    input: GetRecipientNotificationInput,
  ): Promise<GetRecipientNotificationOutput> {
    const { recipientId } = input;
    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);
    return { notifications };
  }
}
