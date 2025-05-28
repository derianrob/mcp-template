import { A2AClient, type AgentCard } from "a2a-sdk-google";
import { z } from "zod";
import type { McpTool } from "../interfaces/tool.interface";

const urls = ["http://localhost:1201"];

const parameters = {} as const;

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class GetAgentsCardsTool implements McpTool<typeof parameters> {
  name = "get-agents-cards";
  description =
    "Gets agents cards, each Agent Card is a JSON document that describes the server's identity, capabilities, skills and endpoint URL.";
  parameters = parameters;
  handler = async (params: Parameters) => {
    try {
      const agentsCards = await Promise.all(
        urls.map(async (url) => {
          const client = new A2AClient({
            baseUrl: url,
          });
          const agentCard = await client.getAgentCard();
          return agentCard;
        })
      );

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(agentsCards, null, 2),
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

export const getAgentsCards = new GetAgentsCardsTool();
