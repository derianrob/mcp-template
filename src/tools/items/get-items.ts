import { z } from 'zod';
import type { McpTool } from '../../interfaces/tool.interface';
import { response, errorResponse } from '../../utils/response';
import { ItemsService } from '../../services/itemsService';

const parameters = {} as const;

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class GetItemsTool implements McpTool<typeof parameters> {
  name = 'get-items';
  description = 'Gets all items';
  parameters = parameters;
  handler = async (params: Parameters) => {
    try {
      const itemService = new ItemsService();
      const items = await itemService.getItems();

      return response(items);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const getItems = new GetItemsTool();
