import type { IContact } from './contact.interface';
import type { IItem } from './item.interface';

export interface IInvoiceBase {
  date: Date;
  dueDate: Date;
  client: IContact;
  items: IItem[];
}

export interface IInvoice extends IInvoiceBase {
  id: string;
}
