import { z } from 'zod';
import type { McpTool } from '../../interfaces/tool.interface';
import { response, errorResponse } from '../../utils/response';
import { ContactsService } from '../../services/contactService';

const parameters = {
  id: z.string().describe('Contact ID'),
} as const;

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class ContactDetailTool implements McpTool<typeof parameters> {
  name = 'get-contact-detail';
  description = 'Gets detailed contact information';
  parameters = parameters;
  handler = async ({ id }: Parameters) => {
    try {
      const contactService = new ContactsService();
      const contact = await contactService.getContact(id);

      return response(contact);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const getContactDetail = new ContactDetailTool();
