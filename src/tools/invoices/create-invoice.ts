import { z } from 'zod';
import { response, errorResponse } from '../../utils/response';
import { InvoicesService } from '../../services/invoiceService';

import type { McpTool } from '../../interfaces/tool.interface';
import type { IContact, IContactAddress } from '../../interfaces/contact.interface';
import type { IItem } from '../../interfaces/item.interface';

const addressSchema = z.object({
  zipCode: z.string().describe('Client address zip code'),
}) satisfies z.ZodType<IContactAddress>;

const clientSchema = z.object({
  id: z.string().describe('Client ID'),
  name: z.string().describe('Client name'),
  email: z.string().describe('Client email'),
  phone: z.string().describe('Client phone'),
  address: addressSchema.describe('Client address'),
}) satisfies z.ZodType<IContact>;

const itemSchema = z.object({
  id: z.string().describe('Item ID'),
  name: z.string().describe('Item name'),
  price: z.number().describe('Item price'),
  description: z.string().describe('Item description'),
}) satisfies z.ZodType<IItem>;

const parameters = {
  date: z.string().describe('Invoice date'),
  dueDate: z.string().describe('Invoice due date'),
  client: clientSchema.describe('Client'),
  items: z.array(itemSchema).describe('Array of items for the invoice'),
};

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class CreateInvoiceTool implements McpTool<typeof parameters> {
  name = 'create-invoice';
  description = 'Creates an invoice';
  parameters = parameters;
  handler = async (params: Parameters) => {
    try {
      const invoiceService = new InvoicesService();
      const invoice = await invoiceService.createInvoice(params);

      return response(invoice);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const createInvoice = new CreateInvoiceTool();
