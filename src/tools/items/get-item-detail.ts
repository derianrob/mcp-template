import { z } from 'zod';
import type { McpTool } from '../../interfaces/tool.interface';
import { response, errorResponse } from '../../utils/response';
import { ItemsService } from '../../services/itemsService';

const parameters = {
  id: z.string().describe('Item ID'),
};

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class GetItemDetailTool implements McpTool<typeof parameters> {
  name = 'get-item-detail';
  description = 'Gets the detail of an item';
  parameters = parameters;
  handler = async (params: Parameters) => {
    try {
      const itemService = new ItemsService();
      const item = await itemService.getItem(params.id);
      return response(item);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const getItemDetail = new GetItemDetailTool();
