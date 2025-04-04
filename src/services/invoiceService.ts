import API from '../utils/api';
import type { IInvoice, IInvoiceBase } from '../interfaces/invoice.interface';

export class InvoicesService extends API {
  async getInvoice(id: string): Promise<IInvoice> {
    try {
      const response = await this.client.get(`/v1/invoices/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getInvoices(): Promise<IInvoice[]> {
    try {
      const response = await this.client.get('/v1/invoices');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createInvoice(invoice: IInvoiceBase): Promise<IInvoice> {
    try {
      const response = await this.client.post('/v1/invoices', invoice);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
