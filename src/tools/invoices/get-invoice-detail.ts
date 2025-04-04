import { z } from 'zod';
import type { McpTool } from '../../interfaces/tool.interface';
import { response, errorResponse } from '../../utils/response';
import { InvoicesService } from '../../services/invoiceService';

const parameters = {
  id: z.string().describe('Invoice ID'),
};

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class GetInvoiceDetailTool implements McpTool<typeof parameters> {
  name = 'get-invoice-detail';
  description = 'Gets the detail of an invoice';
  parameters = parameters;
  handler = async (params: Parameters) => {
    try {
      const invoiceService = new InvoicesService();
      const invoice = await invoiceService.getInvoice(params.id);

      return response(invoice);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const getInvoiceDetail = new GetInvoiceDetailTool();
