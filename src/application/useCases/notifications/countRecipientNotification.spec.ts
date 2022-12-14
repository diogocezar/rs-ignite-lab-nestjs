import { CountRecipientNotification } from '@application/useCases/notifications/countRecipientNotification';
import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';

describe('CountRecipientNotification', () => {
  it('should be able to count notifications by recipient id', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
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
