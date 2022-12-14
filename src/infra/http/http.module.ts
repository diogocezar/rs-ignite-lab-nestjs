import { Module } from '@nestjs/common';
import { SendNotification } from 'src/application/useCases/notifications/sendNotification';
import { NotificationsController } from 'src/infra/http/controllers/notifications/notifications.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
