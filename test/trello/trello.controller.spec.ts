import { Test, TestingModule } from '@nestjs/testing';
import { TrelloController } from '../../src/trello/trello.controller';
import { TrelloService } from '../../src/trello/trello.service';

describe('TrelloController', () => {
  let trelloController: TrelloController;
  let trelloService: TrelloService;

  const mockTrelloService = {
    getBoards: jest.fn(),
    getListsOnBoard: jest.fn(),
    getCardsInList: jest.fn(),
    createCard: jest.fn(),
    updateCard: jest.fn(),
    deleteCard: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrelloController],
      providers: [
        {
          provide: TrelloService,
          useValue: mockTrelloService,
        },
      ],
    }).compile();

    trelloController = module.get<TrelloController>(TrelloController);
    trelloService = module.get<TrelloService>(TrelloService);
  });

  it('should be defined', () => {
    expect(trelloController).toBeDefined();
  });

  describe('getBoards', () => {
    it('should return an array of boards', async () => {
      const result = ['board1', 'board2'];
      mockTrelloService.getBoards.mockResolvedValue(result);

      expect(await trelloController.getBoards()).toBe(result);
      expect(mockTrelloService.getBoards).toHaveBeenCalled();
    });
  });

  describe('getListsOnBoard', () => {
    it('should return an array of lists by boardId', async () => {
      const result = ['list1', 'list2'];
      const boardId = 'boardId1';
      mockTrelloService.getListsOnBoard.mockResolvedValue(result);

      expect(await trelloController.getListsOnBoard(boardId)).toBe(result);
      expect(mockTrelloService.getListsOnBoard).toHaveBeenCalledWith(boardId);
    });
  });

  describe('getCardsOnBoard', () => {
    it('should return an array of cards by listId', async () => {
      const result = ['card1', 'card2'];
      const listId = 'listId1';
      mockTrelloService.getCardsInList.mockResolvedValue(result);

      expect(await trelloController.getCardsOnBoard(listId)).toBe(result);
      expect(mockTrelloService.getCardsInList).toHaveBeenCalledWith(listId);
    });
  });

  describe('createCard', () => {
    it('should return the created card data', async () => {
      const createCardDto = { listId: 'listId1', name: 'New Card', desc: 'Card Description' };
      const result = { ...createCardDto, id: 'cardId1' };
      mockTrelloService.createCard.mockResolvedValue(result);

      expect(await trelloController.createCard(createCardDto)).toBe(result);
      expect(mockTrelloService.createCard).toHaveBeenCalledWith(
        createCardDto.listId,
        createCardDto.name,
        createCardDto.desc,
      );
    });
  });

  describe('updateCard', () => {
    it('should return the updated card data', async () => {
      const updateCardDto = { name: 'Updated Card', desc: 'Updated Description' };
      const cardId = 'cardId1';
      const result = { ...updateCardDto, id: cardId };
      mockTrelloService.updateCard.mockResolvedValue(result);

      expect(await trelloController.updateCard(cardId, updateCardDto)).toBe(result);
      expect(mockTrelloService.updateCard).toHaveBeenCalledWith(
        cardId,
        updateCardDto.name,
        updateCardDto.desc,
      );
    });
  });

  describe('deleteCard', () => {
    it('should return the deleted card confirmation', async () => {
      const cardId = 'cardId1';
      const result = { message: 'Card deleted successfully' };
      mockTrelloService.deleteCard.mockResolvedValue(result);

      expect(await trelloController.deleteCard(cardId)).toBe(result);
      expect(mockTrelloService.deleteCard).toHaveBeenCalledWith(cardId);
    });
  });
});
