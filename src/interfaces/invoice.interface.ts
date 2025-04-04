export interface IInvoiceBase {
  name: string;
  description: string;
  price: number;
}

export interface IInvoice extends IInvoiceBase {
  id: string;
}
