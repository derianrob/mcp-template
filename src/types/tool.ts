import type { ToolCallback } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { z } from "zod";

export interface McpTool<Args extends z.ZodRawShape> {
  name: string;
  description: string;
  parameters: Args;
  handler: ToolCallback<Args>;
}

export abstract class BaseTool<Args extends z.ZodRawShape> {
  protected abstract readonly name: string;
  protected abstract readonly description: string;
  protected abstract readonly parameters: Args;
  protected abstract readonly handler: ToolCallback<Args>;

  public getTool(): McpTool<Args> {
    return {
      name: this.name,
      description: this.description,
      parameters: this.parameters,
      handler: this.handler,
    };
  }
}
