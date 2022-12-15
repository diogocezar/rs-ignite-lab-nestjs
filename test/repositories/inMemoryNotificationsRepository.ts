import { Notification } from '@application/entities/notifications/notification';
import { NotificationsRepository } from '@application/repositories/notifications/notificationsRepository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findById(id: string): Promise<Notification | null> {
    return (
      this.notifications.find((notification) => notification.id === id) || null
    );
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const index = this.notifications.findIndex((n) => n.id === notification.id);
    this.notifications[index] = notification;
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }
}
