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
      const data = {
        ...contact,
        address: {
          ...contact.address,
          country: 'MEX',
        },
        thirdType: 'NATIONAL',
        regime: 'NO_REGIME',
        type: 'client',
      };

      // process.stderr.write(`${JSON.stringify(data, null, 2)}\n`);
      const response = await this.client.post('/v1/contacts', data);
      return response.data;
    } catch (error) {
      // process.stderr.write(`${JSON.stringify(error, null, 2)}\n`);
      throw error;
    }
  }
}
