import { Test, TestingModule } from '@nestjs/testing';
import { TrelloService } from '../../src/trello/trello.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TrelloService', () => {
  let trelloService: TrelloService;
  const mockToken = 'mock-token';
  const mockApiKey = 'mock-api-key';
  const mockBaseUrl = 'https://api.trello.com/1';
  const mockBoardId = 'board1';
  const mockListId = 'list1';
  const mockCardId = 'card1';

  beforeEach(async () => {
    process.env.TRELLO_TOKEN = mockToken;
    process.env.TRELLO_API_KEY = mockApiKey;
    process.env.TRELLO_API_BASE_URL = mockBaseUrl;

    const module: TestingModule = await Test.createTestingModule({
      providers: [TrelloService],
    }).compile();

    trelloService = module.get<TrelloService>(TrelloService);
  });

  describe('getBoards', () => {
    it('should return board data', async () => {
      const mockResponse = [{ id: 'board1', name: 'Board 1' }];
      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      const result = await trelloService.getBoards();

      expect(result).toEqual(mockResponse);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${mockBaseUrl}/members/me/boards?key=${mockApiKey}&token=${mockToken}`,
      );
    });

    it('should throw an error when the request fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(trelloService.getBoards()).rejects.toThrow('Network error');
    });
  });

  describe('getListsOnBoard', () => {
    it('should return lists data by boardId', async () => {
      const mockResponse = [{ id: 'list1', name: 'List 1' }];
      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      const result = await trelloService.getListsOnBoard(mockBoardId);

      expect(result).toEqual(mockResponse);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${mockBaseUrl}/boards/${mockBoardId}/lists?key=${mockApiKey}&token=${mockToken}`,
      );
    });

    it('should throw an error when the request fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(trelloService.getListsOnBoard(mockBoardId)).rejects.toThrow('Network error');
    });
  });

  describe('getCardsInList', () => {
    it('should return cards data by listId', async () => {
      const mockResponse = [{ id: 'card1', name: 'Card 1' }];
      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      const result = await trelloService.getCardsInList(mockListId);

      expect(result).toEqual(mockResponse);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${mockBaseUrl}/lists/${mockListId}/cards?key=${mockApiKey}&token=${mockToken}`,
      );
    });

    it('should throw an error when the request fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(trelloService.getCardsInList(mockListId)).rejects.toThrow('Network error');
    });
  });

  describe('createCard', () => {
    it('should return the created card data', async () => {
      const mockResponse = { id: 'card1', name: 'Card 1', desc: 'Card Description' };
      const createCardDto = { listId: mockListId, name: 'New Card', desc: 'Card Description' };
      mockedAxios.post.mockResolvedValue({ data: mockResponse });

      const result = await trelloService.createCard(
        createCardDto.listId,
        createCardDto.name,
        createCardDto.desc,
      );

      expect(result).toEqual(mockResponse);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${mockBaseUrl}/cards?key=${mockApiKey}&token=${mockToken}`,
        {
          name: createCardDto.name,
          desc: createCardDto.desc,
          idList: createCardDto.listId,
        },
      );
    });

    it('should throw an error when the request fails', async () => {
      mockedAxios.post.mockRejectedValue(new Error('Network error'));

      const createCardDto = { listId: mockListId, name: 'New Card', desc: 'Card Description' };

      await expect(
        trelloService.createCard(createCardDto.listId, createCardDto.name, createCardDto.desc),
      ).rejects.toThrow('Network error');
    });
  });

  describe('updateCard', () => {
    it('should return the updated card data', async () => {
      const mockResponse = { id: mockCardId, name: 'Updated Card', desc: 'Updated Description' };
      const updateCardDto = { name: 'Updated Card', desc: 'Updated Description' };
      mockedAxios.put.mockResolvedValue({ data: mockResponse });

      const result = await trelloService.updateCard(mockCardId, updateCardDto.name, updateCardDto.desc);

      expect(result).toEqual(mockResponse);
      expect(mockedAxios.put).toHaveBeenCalledWith(
        `${mockBaseUrl}/cards/${mockCardId}?key=${mockApiKey}&token=${mockToken}`,
        { name: updateCardDto.name, desc: updateCardDto.desc },
      );
    });

    it('should throw an error when the request fails', async () => {
      mockedAxios.put.mockRejectedValue(new Error('Network error'));

      await expect(trelloService.updateCard(mockCardId, 'Updated Card', 'Updated Description')).rejects.toThrow('Network error');
    });
  });

  describe('deleteCard', () => {
    it('should return a success message when the card is deleted', async () => {
      mockedAxios.delete.mockResolvedValue({});

      const result = await trelloService.deleteCard(mockCardId);

      expect(result).toEqual({ message: 'Card deleted successfully' });
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `${mockBaseUrl}/cards/${mockCardId}?key=${mockApiKey}&token=${mockToken}`,
      );
    });

    it('should throw an error when the request fails', async () => {
      mockedAxios.delete.mockRejectedValue(new Error('Network error'));

      await expect(trelloService.deleteCard(mockCardId)).rejects.toThrow('Network error');
    });
  });
});
