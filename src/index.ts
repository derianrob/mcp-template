import { McpTemplateServer } from "./core/mcp-server";

// Función principal para iniciar el servidor
async function main() {
  const workshopServer = new McpTemplateServer();
  await workshopServer.start();
}

// Manejo de errores global
main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
