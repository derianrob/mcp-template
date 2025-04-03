import API from '../utils/api';
import type { Contact } from '../interfaces/contact.interface';

export class ContactsService extends API {
  async getContact(id: string) {
    try {
      const response = await this.client.get(`/v1/contacts/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getContacts() {
    try {
      const response = await this.client.get('/v1/contacts');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createContact(contact: Contact) {
    try {
      const response = await this.client.post('/api/v1/contacts', contact);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
