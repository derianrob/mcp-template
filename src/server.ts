import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTool } from './utils/register-tool';
import packageJson from '../package.json';

// Tools
import { getContactDetail } from './tools/contacts/get-contact-detail';
import { getContacts } from './tools/contacts/get-contacts';
import { createContact } from './tools/contacts/create-contact';

import { getItemDetail } from './tools/items/get-item-detail';
import { getItems } from './tools/items/get-items';
import { createItem } from './tools/items/create-item';

import { getInvoiceDetail } from './tools/invoices/get-invoice-detail';
import { getInvoices } from './tools/invoices/get-invoices';
import { createInvoice } from './tools/invoices/create-invoice';

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
    this.tools = [
      getContactDetail,
      getContacts,
      createContact,
      getItemDetail,
      getItems,
      createItem,
      createInvoice,
      getInvoiceDetail,
      getInvoices,
    ];

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
