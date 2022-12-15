import { ReadNotification } from '@application/useCases/notifications/readNotification';
import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { NotificationNotFoundError } from '../errors/notifications/notificationNotFoundError';

describe('ReadNotification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    notificationsRepository.create(notification);

    await readNotification.execute({ id: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification that does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    await expect(
      readNotification.execute({ id: 'some-notification-id' }),
    ).rejects.toThrowError(NotificationNotFoundError);
  });
});
