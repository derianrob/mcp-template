import API from '../utils/api';
import type { IItem } from '../interfaces/item.interface';

export class ItemsService extends API {
  async getItem(id: string) {
    try {
      const response = await this.client.get(`/v1/items/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getItems() {
    try {
      const response = await this.client.get('/v1/items');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createItem(item: IItem) {
    try {
      const response = await this.client.post('/v1/items', item);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
