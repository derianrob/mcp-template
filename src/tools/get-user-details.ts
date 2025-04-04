import { z } from 'zod';
import type { McpTool } from '../interfaces/tool.interface';

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
        email: 'john.doe@example.com',
        role: 'admin',
        status: 'active',
      };

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(exampleUserDetails, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Error retrieving user details: ${
              error instanceof Error ? error.message : 'Unknown error'
            }`,
          },
        ],
      };
    }
  };
}

export const getUserDetails = new UserDetailsTool();
