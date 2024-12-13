import { Module } from '@nestjs/common';
import { TrelloModule } from './trello/trello.module';

@Module({
  imports: [TrelloModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
