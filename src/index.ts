import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTool } from "./utils/register-tool";
import packageJson from "../package.json";
import { getUserDetails } from "./tools/get-user-details";

class MCPWorkshopServer {
  private server: McpServer;
  private transport: StdioServerTransport;
  private tools: any[];

  constructor() {
    // Inicializamos el servidor con el nombre y versión del package.json
    this.server = new McpServer({
      name: packageJson.name,
      version: packageJson.version,
    });

    // Inicializamos el transporte
    this.transport = new StdioServerTransport();

    // Inicializamos la lista de herramientas
    this.tools = [getUserDetails];

    // Registramos las herramientas
    this.registerTools();
  }

  private registerTools(): void {
    // Registramos cada herramienta en el servidor
    this.tools.forEach((tool) => {
      registerTool(this.server, tool);
    });
  }

  public async start(): Promise<void> {
    try {
      // Conectamos el servidor al transporte
      await this.server.connect(this.transport);
      console.error("MCP Server running on stdio");
    } catch (error) {
      console.error("Error starting server:", error);
      throw error;
    }
  }

  // Método para agregar nuevas herramientas
  public addTool(tool: any): void {
    this.tools.push(tool);
    registerTool(this.server, tool);
  }
}

// Función principal para iniciar el servidor
async function main() {
  const workshopServer = new MCPWorkshopServer();
  await workshopServer.start();
}

// Manejo de errores global
main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
