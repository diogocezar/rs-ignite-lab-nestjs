import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories/notifications/notificationsRepository';

export interface CountRecipientNotificationInput {
  recipientId: string;
}

export interface CountRecipientNotificationOutput {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: NotificationsRepository) {}
  async execute(
    input: CountRecipientNotificationInput,
  ): Promise<CountRecipientNotificationOutput> {
    const { recipientId } = input;
    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );
    return { count };
  }
}
