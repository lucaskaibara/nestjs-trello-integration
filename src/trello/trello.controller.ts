import { TrelloService } from './trello.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Post, Body, Delete, Put, HttpStatus } from '@nestjs/common';

@Controller('trello')
@ApiTags('trello')
export class TrelloController {
  constructor(private readonly trelloService: TrelloService) {}

  @Get('boards')
  @ApiOperation({ summary: 'Get all boards' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfully recovered all board data' })
  async getBoards() {
    return this.trelloService.getBoards();
  }

  @Get('lists/:boardId')
  @ApiOperation({ summary: 'Get all lists by boardId' })
  @ApiParam({ name: 'boardId', type: 'string', description: 'Board ID to recover lists data' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfully recovered all lists data by boardId' })
  async getListsOnBoard(@Param('boardId') boardId: string) {
    return this.trelloService.getListsOnBoard(boardId);
  }

  @Get('cards/:listId')
  @ApiOperation({ summary: 'Get all cards by listId' })
  @ApiParam({ name: 'listId', type: 'string', description: 'List ID to recover cards data' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfully recovered all cards data by listId' })
  async getCardsOnBoard(@Param('listId') boardId: string) {
    return this.trelloService.getCardsInList(boardId);
  }

  @Post('create-card')
  @ApiOperation({ summary: 'Create card' })
  @ApiBody({ 
    description: 'Card data for creation',
    schema: {
      type: 'object',
      properties: {
        listId: {type: 'string' },
        name: {type: 'string' },
        desc: {type: 'string' },
      }
    }
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Card created successfully' })
  async createCard(@Body() body: { listId: string, name: string, desc: string }) {
    return this.trelloService.createCard(body.listId, body.name, body.desc);
  }

  @Put('update-card/:cardId')
  @ApiOperation({ summary: 'Update card' })
  @ApiParam({ name: 'cardId', type: 'string', description: 'Card ID to update data' })
  @ApiBody({ 
    description: 'Card data for the update',
    schema: {
      type: 'object',
      properties: {
        name: {type: 'string' },
        desc: {type: 'string' },
      }
    }
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Card updated successfully' })
  async updateCard(
    @Param('cardId') cardId: string,
    @Body() body: { name: string, desc: string }
  ) {
    return this.trelloService.updateCard(cardId, body.name, body.desc);
  }

  @Delete('delete-card/:cardId')
  @ApiOperation({ summary: 'Delete card' })
  @ApiParam({ name: 'cardId', type: 'string', description: 'Card ID to delete data' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Card deleted successfully' })
  async deleteCard(@Param('cardId') cardId: string) {
    return this.trelloService.deleteCard(cardId);
  }
}
