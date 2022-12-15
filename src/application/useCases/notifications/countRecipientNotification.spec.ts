import { Notification } from '@application/entities/notifications/notification';
import { Content } from '@application/entities/notifications/props/content';
import { CountRecipienteNotification } from '@application/useCases/notifications/countRecipientNotification';
import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';

describe('CountRecipienteNotification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipienteNotification(
      notificationsRepository,
    );

    notificationsRepository.create(
      makeNotification({ recipientId: 'some-recipient-id-1' }),
    );
    notificationsRepository.create(
      makeNotification({ recipientId: 'some-recipient-id-1' }),
    );
    notificationsRepository.create(
      makeNotification({ recipientId: 'some-recipient-id-2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'some-recipient-id-1',
    });

    expect(count).toEqual(2);
  });
});
