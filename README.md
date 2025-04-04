# Guía de Implementación de Servicios MCP 🛠️

Esta guía te ayudará a implementar los servicios de Contacts, Items e Invoices sobre el template base de MCP.

## Estructura de Archivos 📁

```
src/
├── interfaces/
│   ├── contact.interface.ts
│   ├── item.interface.ts
│   └── invoice.interface.ts
├── services/
│   ├── contactService.ts
│   ├── itemsService.ts
│   └── invoiceService.ts
├── tools/
│   ├── contacts/
│   │   ├── create-contact.ts
│   │   ├── get-contact-detail.ts
│   │   └── get-contacts.ts
│   ├── items/
│   │   ├── create-item.ts
│   │   ├── get-item-detail.ts
│   │   └── get-items.ts
│   └── invoices/
│       ├── create-invoice.ts
│       ├── get-invoice-detail.ts
│       └── get-invoices.ts
└── utils/
    └── api.ts
```

## 1. Configuración Base 🚀

1. Clona este repositorio:

```bash
git clone https://github.com/derianrob/mcp-template name-mcp
cd name-mcp
```

2. Instala las dependencias:

```bash
npm install
```

## 2. Implementación de Interfaces 📝

### 2.1 Interfaz de Contactos

Crea el archivo `src/interfaces/contact.interface.ts`:

```typescript
export interface IContactAddress {
  zipCode: string;
}

export interface IContactBase {
  name: string;
  email: string;
  address: IContactAddress;
}

export interface IContact extends IContactBase {
  id: string;
}
```

### 2.2 Interfaz de Items

Crea el archivo `src/interfaces/item.interface.ts`:

```typescript
export interface IItemBase {
  name: string;
  description: string;
  price: number;
}

export interface IItem extends IItemBase {
  id: string;
}

export interface IItemPayload extends IItem {
  quantity: number;
}
```

### 2.3 Interfaz de Invoices

Crea el archivo `src/interfaces/invoice.interface.ts`:

```typescript
import type { IContact } from './contact.interface';
import type { IItem } from './item.interface';

export interface IInvoiceBase {
  date: string;
  dueDate: string;
  client: IContact;
  items: IItem[];
  paymentMethod: 'cash' | 'credit-card' | 'debit-card';
}

export interface IInvoice extends IInvoiceBase {
  id: string;
}
```

## 3. Implementación de Servicios 🔧

### 3.1 Servicio de Contactos

Crea el archivo `src/services/contactService.ts`:

```typescript
import API from '../utils/api';
import type { IContactBase, IContact } from '../interfaces/contact.interface';

export class ContactsService extends API {
  async getContact(id: string): Promise<IContact> {
    try {
      const response = await this.client.get(`/v1/contacts/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getContacts(): Promise<IContact[]> {
    try {
      const response = await this.client.get('/v1/contacts');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createContact(contact: IContactBase): Promise<IContact> {
    try {
      const data = {
        ...contact,
        address: {
          ...contact.address,
          country: 'MEX',
        },
        thirdType: 'NATIONAL',
        regime: 'NO_REGIME',
        type: 'client',
      };
      const response = await this.client.post('/v1/contacts', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
```

### 3.2 Servicio de Items

Crea el archivo `src/services/itemsService.ts`:

```typescript
import API from '../utils/api';
import type { IItem, IItemBase } from '../interfaces/item.interface';

export class ItemsService extends API {
  async getItem(id: string): Promise<IItem> {
    try {
      const response = await this.client.get(`/v1/items/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getItems(): Promise<IItem[]> {
    try {
      const response = await this.client.get('/v1/items');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createItem(item: IItemBase): Promise<IItem> {
    try {
      const response = await this.client.post('/v1/items', item);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
```

### 3.3 Servicio de Invoices

Crea el archivo `src/services/invoiceService.ts`:

```typescript
import API from '../utils/api';
import type { IInvoice, IInvoiceBase } from '../interfaces/invoice.interface';

export class InvoicesService extends API {
  async getInvoice(id: string): Promise<IInvoice> {
    try {
      const response = await this.client.get(`/v1/invoices/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getInvoices(): Promise<IInvoice[]> {
    try {
      const response = await this.client.get('/v1/invoices');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createInvoice(invoice: IInvoiceBase): Promise<IInvoice> {
    try {
      const response = await this.client.post('/v1/invoices', invoice);
      return response.data;
    } catch (error) {
      process.stderr.write(`${JSON.stringify(error, null, 2)}\n`);
      throw error;
    }
  }
}
```

## 4. Implementación de Herramientas 🔨

### 4.1 Herramientas de Contactos

#### create-contact.ts

```typescript
import { z } from 'zod';
import { response, errorResponse } from '../../utils/response';
import { ContactsService } from '../../services/contactService';

import type { McpTool } from '../../interfaces/tool.interface';
import type { IContactAddress } from '../../interfaces/contact.interface';

const addressSchema = z.object({
  zipCode: z.string().describe('Contact address zip code'),
}) satisfies z.ZodType<IContactAddress>;

const parameters = {
  name: z.string().describe('Contact name'),
  email: z.string().describe('Contact email'),
  identification: z.string().optional().describe('Contact identification'),
  address: addressSchema.describe('Contact address'),
};

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class CreateContactTool implements McpTool<typeof parameters> {
  name = 'create-contact';
  description = 'Creates a new contact';
  parameters = parameters;
  handler = async (params: Parameters) => {
    try {
      const contactService = new ContactsService();
      const contact = await contactService.createContact(params);

      return response(contact);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const createContact = new CreateContactTool();
```

#### get-contacts.ts

```typescript
import { z } from 'zod';
import type { McpTool } from '../../interfaces/tool.interface';
import { response, errorResponse } from '../../utils/response';
import { ContactsService } from '../../services/contactService';

const parameters = {} as const;

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class GetContactsTool implements McpTool<typeof parameters> {
  name = 'get-contacts';
  description = 'Gets all contacts';
  parameters = parameters;
  handler = async (params: Parameters) => {
    try {
      const contactService = new ContactsService();
      const contacts = await contactService.getContacts();

      return response(contacts);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const getContacts = new GetContactsTool();
```

#### get-contact-detail.ts

```typescript
import { z } from 'zod';
import type { McpTool } from '../../interfaces/tool.interface';
import { response, errorResponse } from '../../utils/response';
import { ContactsService } from '../../services/contactService';

const parameters = {
  id: z.string().describe('Contact ID'),
} as const;

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class ContactDetailTool implements McpTool<typeof parameters> {
  name = 'get-contact-detail';
  description = 'Gets detailed contact information';
  parameters = parameters;
  handler = async ({ id }: Parameters) => {
    try {
      const contactService = new ContactsService();
      const contact = await contactService.getContact(id);

      return response(contact);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const getContactDetail = new ContactDetailTool();
```

### 4.2 Herramientas de Items

#### create-item.ts

```typescript
import { z } from 'zod';
import type { McpTool } from '../../interfaces/tool.interface';
import { response, errorResponse } from '../../utils/response';
import { ItemsService } from '../../services/itemsService';

const parameters = {
  name: z.string().describe('Item name'),
  description: z.string().describe('Item description'),
  price: z.number().describe('Item price'),
};

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class CreateItemTool implements McpTool<typeof parameters> {
  name = 'create-item';
  description = 'Creates an item';
  parameters = parameters;
  handler = async (params: Parameters) => {
    try {
      const itemService = new ItemsService();
      const item = await itemService.createItem(params);
      return response(item);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const createItem = new CreateItemTool();
```

#### get-items.ts

```typescript
import { z } from 'zod';
import type { McpTool } from '../../interfaces/tool.interface';
import { response, errorResponse } from '../../utils/response';
import { ItemsService } from '../../services/itemsService';

const parameters = {} as const;

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class GetItemsTool implements McpTool<typeof parameters> {
  name = 'get-items';
  description = 'Gets all items';
  parameters = parameters;
  handler = async (params: Parameters) => {
    try {
      const itemService = new ItemsService();
      const items = await itemService.getItems();

      return response(items);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const getItems = new GetItemsTool();
```

#### get-item-detail.ts

```typescript
import { z } from 'zod';
import type { McpTool } from '../../interfaces/tool.interface';
import { response, errorResponse } from '../../utils/response';
import { ItemsService } from '../../services/itemsService';

const parameters = {
  id: z.string().describe('Item ID'),
};

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class GetItemDetailTool implements McpTool<typeof parameters> {
  name = 'get-item-detail';
  description = 'Gets the detail of an item';
  parameters = parameters;
  handler = async (params: Parameters) => {
    try {
      const itemService = new ItemsService();
      const item = await itemService.getItem(params.id);
      return response(item);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const getItemDetail = new GetItemDetailTool();
```

### 4.3 Herramientas de Invoices

#### create-invoice.ts

```typescript
import { z } from 'zod';
import { response, errorResponse } from '../../utils/response';
import { InvoicesService } from '../../services/invoiceService';

import type { McpTool } from '../../interfaces/tool.interface';
import type { IContact, IContactAddress } from '../../interfaces/contact.interface';
import type { IItemPayload } from '../../interfaces/item.interface';

const addressSchema = z.object({
  zipCode: z.string().describe('Client address zip code'),
}) satisfies z.ZodType<IContactAddress>;

const clientSchema = z.object({
  id: z.string().describe('Client ID'),
  name: z.string().describe('Client name'),
  email: z.string().describe('Client email'),
  address: addressSchema.describe('Client address'),
}) satisfies z.ZodType<IContact>;

const itemSchema = z.object({
  id: z.string().describe('Item ID'),
  name: z.string().describe('Item name'),
  price: z.number().describe('Item price'),
  description: z.string().describe('Item description'),
  quantity: z.number().describe('Item quantity'),
}) satisfies z.ZodType<IItemPayload>;

const parameters = {
  date: z.string().describe('Invoice date (format: yyyy-MM-dd)'),
  dueDate: z.string().describe('Invoice due date (format: yyyy-MM-dd)'),
  paymentMethod: z.enum(['cash', 'credit-card', 'debit-card']).describe('Payment method'),
  client: clientSchema.describe('Client'),
  items: z.array(itemSchema).describe('Array of items for the invoice'),
};

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class CreateInvoiceTool implements McpTool<typeof parameters> {
  name = 'create-invoice';
  description = 'Creates an invoice';
  parameters = parameters;
  handler = async (params: Parameters) => {
    try {
      const invoiceService = new InvoicesService();
      const invoice = await invoiceService.createInvoice(params);

      return response(invoice);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const createInvoice = new CreateInvoiceTool();
```

#### get-invoices.ts

```typescript
import { z } from 'zod';
import { response, errorResponse } from '../../utils/response';
import { InvoicesService } from '../../services/invoiceService';

import type { McpTool } from '../../interfaces/tool.interface';

const parameters = {} as const;

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class GetInvoicesTool implements McpTool<typeof parameters> {
  name = 'get-invoices';
  description = 'Gets all invoices';
  parameters = parameters;
  handler = async (params: Parameters) => {
    try {
      const invoiceService = new InvoicesService();
      const invoices = await invoiceService.getInvoices();

      return response(invoices);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const getInvoices = new GetInvoicesTool();
```

#### get-invoice-detail.ts

```typescript
import { z } from 'zod';
import type { McpTool } from '../../interfaces/tool.interface';
import { response, errorResponse } from '../../utils/response';
import { InvoicesService } from '../../services/invoiceService';

const parameters = {
  id: z.string().describe('Invoice ID'),
};

type Parameters = z.infer<z.ZodObject<typeof parameters>>;

class GetInvoiceDetailTool implements McpTool<typeof parameters> {
  name = 'get-invoice-detail';
  description = 'Gets the detail of an invoice';
  parameters = parameters;
  handler = async (params: Parameters) => {
    try {
      const invoiceService = new InvoicesService();
      const invoice = await invoiceService.getInvoice(params.id);

      return response(invoice);
    } catch (error) {
      return errorResponse(error);
    }
  };
}

export const getInvoiceDetail = new GetInvoiceDetailTool();
```

## 5. Actualizar el Servidor 🖥️

Actualiza el archivo `src/server.ts`:

```typescript
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
```
