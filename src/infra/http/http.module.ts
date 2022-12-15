import { Module } from '@nestjs/common';
import { SendNotification } from '@application/useCases/notifications/sendNotification';
import { NotificationsController } from '@infra/http/controllers/notifications/notifications.controller';
import { DatabaseModule } from '@infra/database/database.module';
import { CancelNotification } from '@application/useCases/notifications/cancelNotification';
import { ReadNotification } from '@application/useCases/notifications/readNotification';
import { UnreadNotification } from '@application/useCases/notifications/unreadNotification';
import { CountRecipientNotification } from '@application/useCases/notifications/countRecipientNotification';
import { GetRecipientNotification } from '@application/useCases/notifications/getRecipientNotification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotification,
    GetRecipientNotification,
  ],
})
export class HttpModule {}
