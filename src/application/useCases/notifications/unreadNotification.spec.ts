import { UnreadNotification } from '@application/useCases/notifications/unreadNotification';
import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { NotificationNotFoundError } from '../errors/notifications/notificationNotFoundError';

describe('UnreadNotification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({ readAt: new Date() });

    notificationsRepository.create(notification);

    await unreadNotification.execute({ id: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    await expect(
      unreadNotification.execute({ id: 'some-notification-id' }),
    ).rejects.toThrowError(NotificationNotFoundError);
  });
});
