import { Module } from '@nestjs/common';
import { SendNotification } from '@application/useCases/notifications/sendNotification';
import { NotificationsController } from '@infra/http/controllers/notifications/notifications.controller';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
