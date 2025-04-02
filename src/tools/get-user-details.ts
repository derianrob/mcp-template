import { z } from "zod";
import type { McpTool } from "../types/tool";

const parameters = {
  userId: z.string().describe("User ID"),
};

export const getUserDetails: McpTool<typeof parameters> = {
  name: "get-user-details",
  description: "Gets detailed user information",
  parameters,
  handler: ({ userId }) => {
    try {
      const exampleUserDetails = {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "admin",
        status: "active",
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(exampleUserDetails, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error retrieving user details: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
          },
        ],
      };
    }
  },
};
