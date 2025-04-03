import { z } from "zod";
import { BaseTool } from "../types/tool";

const parameters = {
  userId: z.string().describe("User ID"),
} as const;

class UserDetailsTool extends BaseTool<typeof parameters> {
  protected readonly name = "get-user-details";
  protected readonly description = "Gets detailed user information";
  protected readonly parameters = parameters;

  protected readonly handler = (params: { userId: string }) => {
    try {
      const exampleUserDetails = {
        id: params.userId,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "admin",
        status: "active",
      };

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(exampleUserDetails, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Error retrieving user details: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
          },
        ],
      };
    }
  };
}

export const getUserDetails = new UserDetailsTool().getTool();
