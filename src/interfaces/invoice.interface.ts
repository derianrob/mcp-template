import type { IContact } from './contact.interface';
import type { IItem } from './item.interface';

export interface IInvoiceBase {
  date: string;
  dueDate: string;
  client: IContact;
  items: IItem[];
  paymentMethod: 'cash' | 'credit-card' | 'debit-card';
}

export interface IInvoice extends IInvoiceBase {
  id: string;
}
