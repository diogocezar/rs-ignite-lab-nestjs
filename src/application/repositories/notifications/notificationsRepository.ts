import { Notification } from '@application/entities/notifications/notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
}
