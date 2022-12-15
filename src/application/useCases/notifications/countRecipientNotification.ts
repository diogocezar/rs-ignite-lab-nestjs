import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '@application/repositories/notifications/notificationsRepository';

export interface CountRecipienteNotificationInput {
  recipientId: string;
}

export interface CountRecipienteNotificationOutput {
  count: number;
}

@Injectable()
export class CountRecipienteNotification {
  constructor(private notificationRepository: NotificationsRepository) {}
  async execute(
    input: CountRecipienteNotificationInput,
  ): Promise<CountRecipienteNotificationOutput> {
    const { recipientId } = input;
    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );
    return { count };
  }
}
