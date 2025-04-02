import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { z } from 'zod'
import type { McpTool } from '../types/tool'

export function registerTool<T extends z.ZodRawShape>(
  server: McpServer,
  tool: McpTool<T>,
) {
  server.tool(tool.name, tool.description, tool.parameters, tool.handler)
}
