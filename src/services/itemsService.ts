import API from '../utils/api';
import type { IItem, IItemBase } from '../interfaces/item.interface';

export class ItemsService extends API {
  async getItem(id: string): Promise<IItem> {
    try {
      const response = await this.client.get(`/v1/items/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getItems(): Promise<IItem[]> {
    try {
      const response = await this.client.get('/v1/items');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createItem(item: IItemBase): Promise<IItem> {
    try {
      const response = await this.client.post('/v1/items', item);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
