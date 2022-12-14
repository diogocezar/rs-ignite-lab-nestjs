import { Module } from '@nestjs/common';
import { HttpModule } from 'src/infra/http/http.module';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {}
