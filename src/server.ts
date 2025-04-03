import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTool } from './utils/register-tool';
import packageJson from '../package.json';
import { getUserDetails } from './tools/get-user-details';

export class McpTemplateServer {
  private server: McpServer;
  private transport: StdioServerTransport;
  private tools: any[];

  constructor() {
    // Inicializamos el servidor con el nombre y versión del package.json
    this.server = new McpServer({
      name: packageJson.name,
      version: packageJson.version,
    });
    this.transport = new StdioServerTransport();

    // Inicializamos la lista de herramientas
    this.tools = [getUserDetails];

    // Registramos las herramientas
    this.registerTools();
  }

  private registerTools(): void {
    this.tools.forEach((tool) => {
      registerTool(this.server, tool);
    });
  }

  public async start(): Promise<void> {
    try {
      await this.server.connect(this.transport);
    } catch (error) {
      throw error;
    }
  }
}
