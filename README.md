# GitHub MCP

Este proyecto es una herramienta que utiliza el Model Context Protocol (MCP) para interactuar con GitHub. Implementa un servidor MCP que proporciona herramientas para acceder y manipular datos de GitHub.

## Descripción

GitHub MCP es una herramienta de línea de comandos que permite interactuar con GitHub utilizando el protocolo MCP (Model Context Protocol). El proyecto está diseñado para ser ejecutado como una herramienta CLI (Command Line Interface) que actúa como un servidor MCP, proporcionando herramientas específicas para GitHub.

## Arquitectura

El proyecto está estructurado de la siguiente manera:

```
src/
├── index.ts           # Punto de entrada principal
├── tools/            # Herramientas MCP implementadas
├── utils/            # Utilidades y helpers
└── types/            # Definiciones de tipos TypeScript
```

### Componentes Principales

1. **Servidor MCP**: Implementado en `index.ts`, maneja la conexión y el registro de herramientas.
2. **Herramientas**: Implementadas en el directorio `tools/`, cada una proporciona una funcionalidad específica.
3. **Utilidades**: Funciones auxiliares y helpers en el directorio `utils/`.
4. **Tipos**: Definiciones de tipos TypeScript para asegurar la seguridad de tipos.

## Herramientas Disponibles

### getUserDetails

- **Nombre**: get-user-details
- **Descripción**: Obtiene información detallada de un usuario
- **Parámetros**:
  - `userId`: ID del usuario a consultar
- **Retorna**: Información detallada del usuario en formato JSON

## Dependencias Principales

### @modelcontextprotocol/sdk (v1.7.0)

El SDK del Model Context Protocol es una biblioteca que proporciona una interfaz estandarizada para interactuar con modelos de lenguaje y sus contextos. Esta dependencia es fundamental para el proyecto ya que permite:

- Manejar el contexto de los modelos de lenguaje
- Gestionar las interacciones con los modelos
- Proporcionar una capa de abstracción para el protocolo MCP

### semver (v7.7.1)

Semver es una biblioteca para el manejo de versiones semánticas. En este proyecto se utiliza para:

- Comparar versiones de software
- Validar números de versión
- Manejar rangos de versiones compatibles

### zod (v3.24.2)

Zod es una biblioteca de validación de esquemas TypeScript que permite:

- Definir y validar estructuras de datos
- Crear tipos en tiempo de ejecución
- Asegurar la integridad de los datos

## Dependencias de Desarrollo

### @types/node (v22.13.17)

Tipos de TypeScript para Node.js, proporcionando definiciones de tipos para las APIs de Node.

### @types/semver (v7.5.8)

Tipos de TypeScript para la biblioteca semver.

### pkgroll (v2.11.2)

Herramienta de construcción para proyectos Node.js que facilita:

- Empaquetado de módulos
- Generación de tipos TypeScript
- Optimización de builds

### tsx (v4.19.3)

Ejecutor de TypeScript que permite:

- Ejecutar archivos TypeScript directamente
- Desarrollo más rápido sin necesidad de compilación previa

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

Para contribuir al proyecto:

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Realizar cambios en el código fuente
4. Construir el proyecto: `npm run build`
5. Probar los cambios

## Licencia

[Especificar la licencia del proyecto]
