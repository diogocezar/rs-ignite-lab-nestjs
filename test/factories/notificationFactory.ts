import {
  Notification,
  NotificationProps,
} from '@application/entities/notifications/notification';
import { Content } from '@application/entities/notifications/props/content';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}): Notification {
  return new Notification({
    recipientId: 'some-recipient-id-2',
    content: new Content('Some content'),
    category: 'some-category',
    ...override,
  });
}
