import { SendNotification } from 'src/application/useCases/notifications/sendNotification';
import { InMemoryNotificationsRepository } from 'test/repositories/inMemoryNotificationsRepository';

describe('SendNotification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      recipientId: 'some-recipient-id',
      content: 'Some content',
      category: 'some-category',
    });

    expect(notification).toBeTruthy();
    expect(notificationsRepository.notifications).toHaveLength(1);
  });
});
