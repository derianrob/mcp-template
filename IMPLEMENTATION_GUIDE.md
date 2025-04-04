# Guía de Implementación: MCP de Gestión de Contactos, Items e Invoices 📚

Esta guía te ayudará a implementar un MCP completo para gestionar contactos, items y facturas, partiendo del template base de MCP.

## Prerrequisitos 📋

1. Haber clonado el template base de MCP
2. Node.js instalado (v18 o superior)
3. npm o yarn instalado

## Estructura del Proyecto 🏗️

Crearemos la siguiente estructura de archivos:

```
src/
├── interfaces/
│   ├── tool.interface.ts
│   ├── contact.interface.ts
│   ├── item.interface.ts
│   └── invoice.interface.ts
├── services/
│   ├── contactService.ts
│   ├── itemService.ts
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
├── utils/
│   ├── register-tool.ts
│   └── response.ts
├── index.ts
└── server.ts
```

## Paso 1: Configuración Inicial 🚀

### 1.1 Actualizar package.json

Agrega las siguientes dependencias:

```json
{
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.7.0",
    "axios": "^1.8.4",
    "zod": "^3.24.2"
  }
}
```

### 1.2 Crear Interfaces Base

Crea el archivo `src/interfaces/tool.interface.ts`:

```typescript
import { z } from 'zod';

export interface McpTool<T> {
  name: string;
  description: string;
  parameters: T;
  handler: (params: z.infer<z.ZodObject<T>>) => Promise<any>;
}
```

Crea el archivo `src/interfaces/contact.interface.ts`:

```typescript
export interface IContactAddress {
  zipCode: string;
}

export interface IContact {
  id?: string;
  name: string;
  email: string;
  identification?: string;
  address: IContactAddress;
}
```

## Paso 2: Implementar Utilidades 🛠️

### 2.1 Crear Utilidad de Respuesta

Crea el archivo `src/utils/response.ts`:

```typescript
export const response = (data: any) => ({
  success: true,
  data,
});

export const errorResponse = (error: any) => ({
  success: false,
  error: error.message || 'Unknown error',
});
```

### 2.2 Crear Utilidad de Registro de Herramientas

Crea el archivo `src/utils/register-tool.ts`:

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { McpTool } from '../interfaces/tool.interface';

export const registerTool = (server: McpServer, tool: McpTool<any>) => {
  server.addTool(tool.name, {
    description: tool.description,
    parameters: tool.parameters,
    handler: tool.handler,
  });
};
```

## Paso 3: Implementar Servicios 🔧

### 3.1 Servicio de Contactos

Crea el archivo `src/services/contactService.ts`:

```typescript
import type { IContact } from '../interfaces/contact.interface';

export class ContactsService {
  private contacts: IContact[] = [];

  async createContact(contact: Omit<IContact, 'id'>): Promise<IContact> {
    const newContact = {
      ...contact,
      id: Math.random().toString(36).substr(2, 9),
    };
    this.contacts.push(newContact);
    return newContact;
  }

  async getContacts(): Promise<IContact[]> {
    return this.contacts;
  }

  async getContactDetail(id: string): Promise<IContact | undefined> {
    return this.contacts.find((contact) => contact.id === id);
  }
}
```

## Paso 4: Implementar Herramientas 🔨

### 4.1 Herramientas de Contactos

Crea el archivo `src/tools/contacts/create-contact.ts`:

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

Crea el archivo `src/tools/contacts/get-contacts.ts`:

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

## Paso 5: Configurar el Servidor 🖥️

### 5.1 Actualizar server.ts

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

export class McpTemplateServer {
  private server: McpServer;
  private transport: StdioServerTransport;
  private tools: any[];

  constructor() {
    this.server = new McpServer({
      name: packageJson.name,
      version: packageJson.version,
    });
    this.transport = new StdioServerTransport();

    this.tools = [getContactDetail, getContacts, createContact];

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

### 5.2 Actualizar index.ts

Actualiza el archivo `src/index.ts`:

```typescript
import { McpTemplateServer } from './server';

const server = new McpTemplateServer();
server.start();
```

## Paso 6: Pruebas 🧪

1. Construye el proyecto:

```bash
npm run build
```

2. Ejecuta el servidor MCP:

```bash
npm run dev
```

3. Prueba las herramientas usando el inspector MCP:

```bash
npx @modelcontextprotocol/inspector
```

## Siguientes Pasos 🚀

1. Implementa las herramientas de Items siguiendo el mismo patrón
2. Implementa las herramientas de Invoices
3. Agrega validaciones adicionales
4. Implementa persistencia de datos
5. Agrega manejo de errores más robusto

## Notas Importantes 📝

- Asegúrate de manejar adecuadamente los errores en cada herramienta
- Valida todos los inputs usando Zod
- Mantén una estructura de código consistente
- Documenta cada herramienta y servicio
- Sigue las mejores prácticas de TypeScript
