import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TrelloService {
  private token = process.env.TRELLO_TOKEN;
  private apiKey = process.env.TRELLO_API_KEY;
  private baseUrl = process.env.TRELLO_API_BASE_URL;

  async getBoards() {
    const url = `${this.baseUrl}/members/me/boards?key=${this.apiKey}&token=${this.token}`;
    const response = await axios.get(url);
    
    return response.data;
  }

  async getListsOnBoard(boardId: string) {
    const url = `${this.baseUrl}/boards/${boardId}/lists?key=${this.apiKey}&token=${this.token}`;
    const response = await axios.get(url);
    
    return response.data;
  }

  async getCardsInList(listId: string) {
    const url = `${this.baseUrl}/lists/${listId}/cards?key=${this.apiKey}&token=${this.token}`;
    const response = await axios.get(url);
    
    return response.data;
  }

  async createCard(listId: string, name: string, desc: string) {
    const url = `${this.baseUrl}/cards?key=${this.apiKey}&token=${this.token}`;
    const response = await axios.post(url, {
      name,
      desc,
      idList: listId,
    });
    
    return response.data;
  }

  async updateCard(cardId: string, name: string, desc: string) {
    const url = `${this.baseUrl}/cards/${cardId}?key=${this.apiKey}&token=${this.token}`;
    const response = await axios.put(url, {
      name,
      desc,
    });
    
    return response.data;
  }

  async deleteCard(cardId: string) {
    const url = `${this.baseUrl}/cards/${cardId}?key=${this.apiKey}&token=${this.token}`;
    await axios.delete(url);

    return { message: 'Card deleted successfully' };
  }
}
