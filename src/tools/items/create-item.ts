import { z } from 'zod';
import type { McpTool } from '../../interfaces/tool.interface';
import { response, errorResponse } from '../../utils/response';
import { ItemsService } from '../../services/itemsService';

const parameters = {
  name: z.string().describe('Item name'),
  description: z.string().describe('Item description'),
  price: z.number().describe('Item price'),
};

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class CreateItemTool implements McpTool<typeof parameters> {
  name = 'create-item';
  description = 'Creates an item';
  parameters = parameters;
  handler = async (params: Parameters) => {
    try {
      const itemService = new ItemsService();
      const item = await itemService.createItem(params);
      return response(item);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const createItem = new CreateItemTool();
