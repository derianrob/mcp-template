# MCP Template

Este proyecto es una plantilla (template) para crear herramientas que implementen el Model Context Protocol (MCP). Proporciona una estructura base y herramientas de ejemplo para facilitar el desarrollo de nuevos MCPs.

## Descripción

MCP Template es un proyecto base que implementa un servidor MCP, proporcionando una estructura organizada y herramientas de ejemplo que pueden ser utilizadas como punto de partida para desarrollar nuevos MCPs. El proyecto está diseñado para ser ejecutado como una herramienta CLI (Command Line Interface) que actúa como un servidor MCP.

## Arquitectura

El proyecto está estructurado de la siguiente manera:

```
src/
├── core/           # Clases base y abstracciones
├── server/         # Lógica del servidor MCP
├── tools/          # Herramientas MCP implementadas
├── utils/          # Utilidades y helpers
└── interfaces/     # Definiciones de interfaces y tipos
```

### Componentes Principales

1. **Servidor MCP**: Implementado en `src/server/mcp-workshop-server.ts`, maneja la conexión y el registro de herramientas.
2. **Herramientas**: Implementadas en el directorio `tools/`, cada una proporciona una funcionalidad específica que puede ser utilizada como ejemplo.
3. **Utilidades**: Funciones auxiliares y helpers en el directorio `utils/`.
4. **Interfaces**: Definiciones de interfaces TypeScript para asegurar la seguridad de tipos.

## Herramientas de Ejemplo

### getUserDetails

- **Nombre**: get-user-details
- **Descripción**: Ejemplo de una herramienta que obtiene información detallada de un usuario
- **Parámetros**:
  - `userId`: ID del usuario a consultar
- **Retorna**: Información detallada del usuario en formato JSON

### Implementación de Herramientas

Las herramientas se implementan siguiendo el patrón de implementación de interfaces en lugar de herencia. Esto proporciona:

- Menor acoplamiento
- Mayor flexibilidad
- Mejor testabilidad
- Código más limpio y mantenible

Ejemplo de implementación:

```typescript
class UserDetailsTool implements McpTool<typeof parameters> {
  name = 'get-user-details';
  description = 'Gets detailed user information';
  parameters = parameters;
  handler = (params: Parameters) => {
    // Implementación del handler
  };
}
```

## Dependencias Principales

### @modelcontextprotocol/sdk (v1.7.0)

El SDK del Model Context Protocol es una biblioteca que proporciona una interfaz estandarizada para interactuar con modelos de lenguaje y sus contextos. Esta dependencia es fundamental para el proyecto ya que permite:

- Manejar el contexto de los modelos de lenguaje
- Gestionar las interacciones con los modelos
- Proporcionar una capa de abstracción para el protocolo MCP

### zod (v3.24.2)

Zod es una biblioteca de validación de esquemas TypeScript que permite:

- Definir y validar estructuras de datos
- Crear tipos en tiempo de ejecución
- Asegurar la integridad de los datos
- Inferir tipos automáticamente de los esquemas

## Dependencias de Desarrollo

### @types/node (v22.13.17)

Tipos de TypeScript para Node.js, proporcionando definiciones de tipos para las APIs de Node.

### pkgroll (v2.11.2)

Herramienta de construcción para proyectos Node.js que facilita:

- Empaquetado de módulos
- Generación de tipos TypeScript
- Optimización de builds

### tsx (v4.19.3)

Ejecutor de TypeScript que permite:

- Ejecutar archivos TypeScript directamente
- Desarrollo más rápido sin necesidad de compilación previa

### ESLint y Prettier

El proyecto utiliza ESLint y Prettier para mantener un código limpio y consistente:

- **ESLint**: Para la detección de problemas y el cumplimiento de reglas de código
- **Prettier**: Para el formateo automático del código

Scripts disponibles:

```bash
# Linting
npm run lint        # Verificar problemas de código
npm run lint:fix    # Corregir problemas de código automáticamente

# Formateo
npm run format      # Formatear todo el código
npm run format:check # Verificar el formateo sin hacer cambios

# Verificación completa
npm run check       # Ejecutar linting y verificación de formateo
```

## Requisitos del Sistema

- Node.js
- TypeScript (como dependencia peer)

## Instalación

```bash
npm install
```

## Uso

1. Construir el proyecto:

```bash
npm run build
```

2. Ejecutar el servidor MCP:

```bash
node dist/index.js
```

El servidor MCP se ejecutará en modo stdio, permitiendo la comunicación a través de la entrada/salida estándar.

## Desarrollo

Para crear un nuevo MCP basado en este template:

1. Clonar este repositorio
2. Modificar el `package.json` con el nombre y descripción de tu nuevo MCP
3. Implementar tus propias herramientas en el directorio `tools/` siguiendo el patrón de implementación de interfaces
4. Modificar el archivo `index.ts` para registrar tus nuevas herramientas
5. Construir el proyecto: `npm run build`
6. Probar los cambios

## Mejores Prácticas

1. **Implementación de Herramientas**:

   - Usar `implements` en lugar de herencia para las herramientas
   - Definir tipos claros para los parámetros usando Zod
   - Mantener las herramientas pequeñas y enfocadas

2. **Estructura del Proyecto**:

   - Mantener una estructura clara y organizada
   - Separar la lógica del servidor de las herramientas
   - Usar interfaces para definir contratos

3. **Tipado**:

   - Aprovechar el sistema de tipos de TypeScript
   - Usar Zod para validación y generación de tipos
   - Mantener las interfaces en el directorio `interfaces/`

4. **Calidad de Código**:
   - Ejecutar `npm run check` antes de hacer commit
   - Mantener el código formateado con Prettier
   - Seguir las reglas de ESLint para mantener la consistencia

## Licencia

[Especificar la licencia del proyecto]
