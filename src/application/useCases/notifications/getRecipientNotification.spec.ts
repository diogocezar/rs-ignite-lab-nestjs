import { GetRecipientNotification } from '@application/useCases/notifications/getRecipientNotification';
import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';

describe('GetRecipienteNotification', () => {
  it('should be able to get notifications by recipient id', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotification = new GetRecipientNotification(
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

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'some-recipient-id-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'some-recipient-id-1' }),
        expect.objectContaining({ recipientId: 'some-recipient-id-1' }),
      ]),
    );
  });
});
