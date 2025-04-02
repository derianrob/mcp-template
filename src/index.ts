import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTool } from "./utils/register-tool";

import packageJson from "../package.json";

//Tools
import { getUserDetails } from "./tools/get-user-details";

// Create server instance
export const mcpServer = new McpServer({
  name: packageJson.name,
  version: packageJson.version,
});

// Register tools
registerTool(mcpServer, getUserDetails);

async function main() {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
