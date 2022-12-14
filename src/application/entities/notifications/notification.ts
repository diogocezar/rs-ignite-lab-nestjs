import { Replace } from 'src/helpers/replace';
import { Content } from 'src/application/entities/notifications/props/content';
import { randomUUID } from 'node:crypto';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
    this._id = randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
  }

  get id(): string {
    return this._id;
  }

  get recipientId(): string {
    return this.props.recipientId;
  }

  set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  get content(): Content {
    return this.props.content;
  }

  set content(content: Content) {
    this.props.content = content;
  }

  get category(): string {
    return this.props.category;
  }

  set category(category: string) {
    this.props.category = category;
  }

  get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  set readAt(readAt: Date | null | undefined) {
    this.props.readAt = readAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
