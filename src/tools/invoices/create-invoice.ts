import { z } from 'zod';
import { response, errorResponse } from '../../utils/response';
import { InvoicesService } from '../../services/invoiceService';

import type { McpTool } from '../../interfaces/tool.interface';
import type { IContact, IContactAddress } from '../../interfaces/contact.interface';
import type { IItemPayload } from '../../interfaces/item.interface';

// Validador de formato de fecha yyyy-MM-dd
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const dateSchema = z
  .string()
  .refine((date) => dateRegex.test(date), {
    message: 'Date must be in format yyyy-MM-dd',
  })
  .transform((date) => new Date(date));

const addressSchema = z.object({
  zipCode: z.string().describe('Client address zip code'),
}) satisfies z.ZodType<IContactAddress>;

const clientSchema = z.object({
  id: z.string().describe('Client ID'),
  name: z.string().describe('Client name'),
  email: z.string().describe('Client email'),
  address: addressSchema.describe('Client address'),
}) satisfies z.ZodType<IContact>;

const itemSchema = z.object({
  id: z.string().describe('Item ID'),
  name: z.string().describe('Item name'),
  price: z.number().describe('Item price'),
  description: z.string().describe('Item description'),
  quantity: z.number().describe('Item quantity'),
}) satisfies z.ZodType<IItemPayload>;

const parameters = {
  date: dateSchema.describe('Invoice date (format: yyyy-MM-dd)'),
  dueDate: dateSchema.describe('Invoice due date (format: yyyy-MM-dd)'),
  paymentMethod: z.enum(['cash', 'credit-card', 'debit-card']).describe('Payment method'),
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
