import { Notification } from '@application/entities/notifications/notification';
import { Content } from '@application/entities/notifications/props/content';
import { CancelNotification } from '@application/useCases/notifications/cancelNotification';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { NotificationNotFoundError } from '../errors/notifications/notificationNotFoundError';

describe('CancelNotification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      recipientId: 'some-recipient-id',
      content: new Content('Some content'),
      category: 'some-category',
    });

    notificationsRepository.create(notification);

    await cancelNotification.execute({ id: notification.id });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    await expect(
      cancelNotification.execute({ id: 'some-notification-id' }),
    ).rejects.toThrowError(NotificationNotFoundError);
  });
});
