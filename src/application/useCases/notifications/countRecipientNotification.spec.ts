import { Notification } from '@application/entities/notifications/notification';
import { Content } from '@application/entities/notifications/props/content';
import { CountRecipienteNotification } from '@application/useCases/notifications/countRecipientNotification';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';

describe('CountRecipienteNotification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipienteNotification(
      notificationsRepository,
    );

    notificationsRepository.create(
      new Notification({
        recipientId: 'some-recipient-id',
        content: new Content('Some content'),
        category: 'some-category',
      }),
    );

    notificationsRepository.create(
      new Notification({
        recipientId: 'some-recipient-id',
        content: new Content('Some content'),
        category: 'some-category',
      }),
    );

    notificationsRepository.create(
      new Notification({
        recipientId: 'some-recipient-id-2',
        content: new Content('Some content'),
        category: 'some-category',
      }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'some-recipient-id',
    });

    expect(count).toEqual(2);
  });
});
