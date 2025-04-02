import type { ToolCallback } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { z } from 'zod'

export interface McpTool<Args extends z.ZodRawShape> {
  name: string
  description: string
  parameters: Args
  handler: ToolCallback<Args>
}
