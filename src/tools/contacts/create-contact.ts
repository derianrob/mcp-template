import { z } from 'zod';
import { response, errorResponse } from '../../utils/response';
import { ContactsService } from '../../services/contactService';

import type { McpTool } from '../../interfaces/tool.interface';
import type { IContactAddress } from '../../interfaces/contact.interface';

const addressSchema = z.object({
  zipCode: z.string().describe('Contact address zip code'),
}) satisfies z.ZodType<IContactAddress>;

const parameters = {
  name: z.string().describe('Contact name'),
  email: z.string().describe('Contact email'),
  identification: z.string().optional().describe('Contact identification'),
  address: addressSchema.describe('Contact address'),
};

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class CreateContactTool implements McpTool<typeof parameters> {
  name = 'create-contact';
  description = 'Creates a new contact';
  parameters = parameters;
  handler = async (params: Parameters) => {
    try {
      const contactService = new ContactsService();
      const contact = await contactService.createContact(params);

      return response(contact);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const createContact = new CreateContactTool();
