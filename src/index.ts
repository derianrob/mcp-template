import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { registerTool } from "./utils/register-tool";
import { getAgentsCards } from "./tools/get-agents";
import { sendMessageToAgent } from "./tools/send-message-to-agent";

// Define our MCP agent with tools
export class MyMCP extends McpAgent {
  private tools: any[] = [getAgentsCards, sendMessageToAgent];

  private registerTools(): void {
    this.tools.forEach((tool) => {
      registerTool(this.server, tool);
    });
  }

  server = new McpServer({
    name: "A2A MCP Server",
    version: "1.0.0",
  });

  async init() {
    this.registerTools();
  }
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (url.pathname === "/sse" || url.pathname === "/sse/message") {
      return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
    }

    if (url.pathname === "/mcp") {
      return MyMCP.serve("/mcp").fetch(request, env, ctx);
    }

    return new Response("Not found", { status: 404 });
  },
};
