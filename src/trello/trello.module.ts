import { Module } from '@nestjs/common';
import { TrelloController } from './trello.controller';
import { TrelloService } from './trello.service';

@Module({
  imports: [],
  controllers: [TrelloController],
  providers: [TrelloService],
})
export class TrelloModule {}
