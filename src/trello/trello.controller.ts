import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { TrelloService } from './trello.service';

@Controller('trello')
export class TrelloController {
  constructor(private readonly trelloService: TrelloService) {}

  @Get('boards')
  async getBoards() {
    return this.trelloService.getBoards();
  }

  @Get('lists/:boardId')
  async getListsOnBoard(@Param('boardId') boardId: string) {
    return this.trelloService.getListsOnBoard(boardId);
  }

  @Get('cards/:listId')
  async getCardsOnBoard(@Param('listId') boardId: string) {
    return this.trelloService.getCardsInList(boardId);
  }

  @Post('create-card')
  async createCard(@Body() body: { listId: string, name: string, desc: string }) {
    return this.trelloService.createCard(body.listId, body.name, body.desc);
  }

  @Put('update-card/:cardId')
  async updateCard(
    @Param('cardId') cardId: string,
    @Body() body: { name: string, desc: string }
  ) {
    return this.trelloService.updateCard(cardId, body.name, body.desc);
  }

  @Delete('delete-card/:cardId')
  async deleteCard(@Param('cardId') cardId: string) {
    return this.trelloService.deleteCard(cardId);
  }
}
