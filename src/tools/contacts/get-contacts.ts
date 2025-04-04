import { z } from 'zod';
import type { McpTool } from '../../interfaces/tool.interface';
import { response, errorResponse } from '../../utils/response';
import { ContactsService } from '../../services/contactService';

const parameters = {} as const;

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class GetContactsTool implements McpTool<typeof parameters> {
  name = 'get-contacts';
  description = 'Gets all contacts';
  parameters = parameters;
  handler = async (params: Parameters) => {
    try {
      const contactService = new ContactsService();
      const contacts = await contactService.getContacts();

      return response(contacts);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const getContacts = new GetContactsTool();
