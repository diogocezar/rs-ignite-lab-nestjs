import { Content } from '@application/entities/notifications/props/content';
import { Notification } from '@application/entities/notifications/notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: 'some-recipient-id',
      content: new Content('Some content'),
      category: 'some-category',
    });
    expect(notification).toBeTruthy();
  });
});
