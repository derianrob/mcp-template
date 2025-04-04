// import * as dotenv from 'dotenv';
// dotenv.config();

import { McpTemplateServer } from './server';

// Función principal para iniciar el servidor
async function main() {
  const workshopServer = new McpTemplateServer();
  await workshopServer.start();
}

// Manejo de errores global
main().catch((error) => {
  process.stderr.write(`Error: ${error}`);
  process.exit(1);
});
