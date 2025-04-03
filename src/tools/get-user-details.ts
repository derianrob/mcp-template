import { z } from 'zod';
import type { McpTool } from '../interfaces/tool.interface';
import { response, errorResponse } from '../utils/response';

const parameters = {
  userId: z.string().describe('User ID'),
} as const;

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class UserDetailsTool implements McpTool<typeof parameters> {
  name = 'get-user-details';
  description = 'Gets detailed user information';
  parameters = parameters;
  handler = (params: Parameters) => {
    try {
      const exampleUserDetails = {
        id: params.userId,
        name: 'John Doe',
        email: process.env.NEXT_PUBLIC_ALEGRA_EMAIL || 'john.doe@example.com',
        role: 'admin',
        status: 'active',
      };

      return response(exampleUserDetails);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const getUserDetails = new UserDetailsTool();
