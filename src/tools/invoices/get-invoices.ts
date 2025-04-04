import { z } from 'zod';
import { response, errorResponse } from '../../utils/response';
import { InvoicesService } from '../../services/invoiceService';

import type { McpTool } from '../../interfaces/tool.interface';

const parameters = {} as const;

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class GetInvoicesTool implements McpTool<typeof parameters> {
  name = 'get-invoices';
  description = 'Gets all invoices';
  parameters = parameters;
  handler = async (params: Parameters) => {
    try {
      const invoiceService = new InvoicesService();
      const invoices = await invoiceService.getInvoices();

      return response(invoices);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const getInvoices = new GetInvoicesTool();
