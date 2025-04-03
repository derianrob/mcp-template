import { z } from 'zod';
import { response, errorResponse } from '../utils/response';
import { ContactsService } from '../services/contactService';

import type { McpTool } from '../interfaces/tool.interface';
import type { ContactAddress } from '../interfaces/contact.interface';

const addressSchema = z.object({
  colony: z.string(),
  municipality: z.string(),
  zipCode: z.string(),
  state: z.string(),
  country: z.string(),
}) satisfies z.ZodType<ContactAddress>;

const parameters = {
  name: z.string().describe('Contact name'),
  email: z.string().describe('Contact email'),
  identification: z.string().describe('Contact identification'),
  address: addressSchema.optional().describe('Contact address'),
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
