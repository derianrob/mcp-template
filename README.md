# MCP Template 🛠️

Este repositorio contiene un template base para crear herramientas que implementen el Model Context Protocol (MCP). Proporciona la estructura y configuración necesaria para comenzar a desarrollar tus propios MCPs de manera rápida y siguiendo las mejores prácticas.

> **Nota**: Este es un template base. Para ver un ejemplo completo de implementación de un MCP, por favor revisa la rama `example`.

## 🎯 Propósito

El propósito de este template es proporcionar:

- Una estructura base consistente para desarrollar MCPs
- Configuración inicial de TypeScript y herramientas de desarrollo
- Implementación básica del servidor MCP
- Sistema de registro de herramientas

## 🏗️ Estructura del Template

```
├── src/
│   ├── interfaces/     # Definiciones de tipos e interfaces
│   ├── tools/          # Implementaciones de herramientas MCP
│   ├── utils/          # Utilidades y funciones helper
│   ├── index.ts        # Punto de entrada de la aplicación
│   └── server.ts       # Implementación del servidor MCP
├── package.json        # Configuración del proyecto y dependencias
├── tsconfig.json       # Configuración de TypeScript
└── README.md          # Esta documentación
```

## 🚀 Comenzando

### Prerrequisitos

- Node.js (versión recomendada: 18 o superior)
- npm o yarn

### Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/tu-usuario/mcp-template.git tu-mcp
cd tu-mcp
```

2. Instala las dependencias:

```bash
npm install
```

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Ejecuta el MCP con el inspector y variables de prueba
npm run serve        # Ejecuta el servidor en modo desarrollo con hot-reload

# Construcción
npm run build        # Construye el proyecto

# Calidad de código
npm run lint         # Verifica el código con ESLint
npm run lint:fix     # Corrige problemas de código automáticamente
npm run format       # Formatea el código con Prettier
npm run check        # Ejecuta todas las verificaciones
```

## 🛠️ Desarrollo de tu MCP

### 1. Configuración Inicial

1. Modifica el `package.json` con el nombre y descripción de tu MCP
2. Actualiza este README con la documentación específica de tu MCP
3. Configura las variables de entorno necesarias

### 2. Implementación de Herramientas

Las herramientas deben implementar la interfaz `McpTool`:

```typescript
interface McpTool<T> {
  name: string;
  description: string;
  parameters: T;
  handler: (params: T) => Promise<any>;
}
```

### 3. Registro de Herramientas

Registra tus herramientas en `src/server.ts`:

```typescript
this.tools = [
  tuNuevaHerramienta,
  // ... más herramientas
];
```

## 📚 Dependencias Principales

- `@modelcontextprotocol/sdk`: SDK del Model Context Protocol
- `zod`: Validación de esquemas y tipos
- `axios`: Cliente HTTP
- `semver`: Manejo de versiones semánticas

## 🔧 Configuración

### TypeScript

La configuración base de TypeScript incluye:

- Módulos ES2022
- Strict mode habilitado
- Generación de source maps
- Declaración de tipos

### ESLint y Prettier

Configuración preestablecida para mantener un código limpio y consistente.

## 🏗️ Estructura de una Herramienta MCP

```typescript
import { z } from 'zod';
import { McpTool } from '../interfaces/mcp-tool';

const parameters = z.object({
  // Define tus parámetros aquí
});

type Parameters = z.infer<typeof parameters>;

export const tuHerramienta: McpTool<typeof parameters> = {
  name: 'nombre-de-tu-herramienta',
  description: 'Descripción de lo que hace tu herramienta',
  parameters,
  handler: async (params: Parameters) => {
    // Implementa tu lógica aquí
  },
};
```

## 🔍 Inspección y Pruebas

Para probar tu MCP localmente:

```bash
npm run dev
```

Esto iniciará el inspector MCP que te permitirá interactuar con tus herramientas.

## 📝 Mejores Prácticas

1. **Organización del Código**

   - Mantén una estructura clara y modular
   - Usa tipos e interfaces para todo
   - Documenta tus funciones y clases

2. **Seguridad**

   - No expongas credenciales en el código
   - Usa variables de entorno para configuración sensible
   - Valida todos los inputs con Zod

3. **Calidad**
   - Ejecuta `npm run check` antes de commits
   - Mantén la cobertura de tipos al 100%
   - Sigue las convenciones de nombres establecidas

## 🤝 Contribución

Si encuentras mejoras posibles para este template, por favor:

1. Haz fork del repositorio
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Abre un Pull Request

## 📄 Licencia

[MIT](LICENSE)

---

🔗 **Enlaces Útiles**

- [Documentación del MCP SDK](https://github.com/modelcontextprotocol/)
- [Guía de Desarrollo de MCPs](https://modelcontextprotocol.io/introduction)
