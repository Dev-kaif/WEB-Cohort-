# Turbo Repo

## Introduction
Turbo Repo is a **monorepo framework** or **build orchestrator** that efficiently manages and organizes the sequence of builds within a monorepo. It optimizes the build process by caching previously built files and only rebuilding the files that have changed. This makes it highly efficient for **CI/CD pipelines** by reducing redundant work and speeding up deployments.

## Features
- 🚀 **Efficient Build Caching**: Turbo Repo caches builds and only rebuilds changed files.
- 🏗 **Monorepo Support**: Manages multiple projects within a single repository.
- 🔄 **Shared Configurations**: Centralized TypeScript, ESLint, and other configurations.
- 📦 **Dependency Hoisting**: Shared dependencies are installed at the root level, reducing duplication.
- 🎨 **Reusable UI Components**: Export and reuse components across multiple applications.

## Monorepo File Structure
A typical **Turbo Repo** project follows this structure:

```sh
root-folder/
├── apps/
│   ├── web/
│   ├── docs/
├── packages/
│   ├── eslint-config/
│   ├── typescript-config/
│   ├── ui/
```

### Explanation:
- **`apps/`**: Contains multiple frontend and backend applications.
- **`packages/`**: Contains shared configurations and libraries, such as:
  - `eslint-config`: Shared ESLint rules.
  - `typescript-config`: Shared TypeScript configuration.
  - `ui`: A reusable UI component library.

## Workspaces in Turbo Repo
Turbo Repo uses **Yarn/PNPM/NPM workspaces** to manage multiple packages within the monorepo. These are defined in the `package.json` file under the `workspaces` key:

```json
"workspaces": [
    "apps/*",
    "packages/*"
]
```

Here, `*` acts as a wildcard to include all folders inside `apps` and `packages` as separate workspaces.

## UI Library & Component Exports
The **UI package (`packages/ui`)** contains reusable UI components that are exported for use in different applications within the monorepo.

### How Export Works:
In the `packages/ui/package.json` file, we use the `exports` object to define component exports:

```json
"exports": {
    "./button": "./src/button.tsx",
    "./card": "./src/card.tsx",
    "./code": "./src/code.tsx",
    "./input": "./src/input.tsx"
}
```

### Importing Components:
Any workspace can import these components like this:

```ts
import { Button } from "@repo/ui/button";
```

This structure ensures modularity and maintainability across the monorepo.

## Managing Multiple Servers
The **`apps` workspace** contains multiple frontend and backend applications. In our case, we created **two backend servers** (`server` and `server2`) and used a shared TypeScript configuration to keep their settings consistent.

### Shared TypeScript Configuration (`packages/typescript-config`)
Instead of duplicating `tsconfig.json` in every server, we created a shared `backend.json` inside `packages/typescript-config`:

```json
{
    "compilerOptions": {
      "target": "es2016",                                 
      "module": "commonjs",
      "esModuleInterop": true,                             
      "forceConsistentCasingInFileNames": true,            
      "strict": true,                                     
     "skipLibCheck": true                                
    }
  }
```

### Extending Shared Configuration in Servers
Each server then extends this shared configuration in its own `tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/backend.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```

**Why Override `rootDir` and `outDir`?**
- The shared config alone does not work because `rootDir` and `outDir` are relative paths.
- If defined globally, TypeScript would look for `src/` and `dist/` in the `packages/typescript-config` folder instead of the actual server folder.
- Overriding these values ensures that the build process works correctly per server.

## Understanding `turbo.json`
Turbo Repo allows task optimization using `turbo.json`. Here’s a typical example:

```json
"tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**"]
    }
}
```

### Explanation:
- **`dependsOn`**: Defines task dependencies (`^build` ensures parent dependencies build first).
- **`inputs`**: Specifies files required before starting the build.
- **`outputs`**: Specifies cached files for future builds.
  - `!` before `.next/cache/**` means this folder **should not** be cached.

## Overriding `turbo.json` for Servers
Since `turbo.json` is global, we may need to override configurations for specific servers. This can be done by creating a **local `turbo.json`** inside the server’s folder and extending the main one:

```json
{
    "extends": ["../../turbo.json"],
    "tasks": {
        "build": {
            "outputs": ["dist/**"]
        }
    }
}
```

This ensures that the `dist/` folder is cached properly for backend builds.

## Summary of Learnings
✅ **Turbo Repo is a build orchestrator** that speeds up monorepo development with caching and task scheduling.

✅ **Workspaces** allow multiple applications and packages to coexist efficiently.

✅ **Shared configurations (TypeScript, ESLint, etc.)** improve maintainability.

✅ **UI components can be shared across applications** using the `exports` field.

✅ Dependency hoisting optimizes node_modules by installing shared dependencies at the root level.

✅ **Overrides in `tsconfig.json` and `turbo.json` are necessary** for correct builds in individual applications.

This structured approach ensures **scalability, reusability, and performance** in a monorepo setup. 🚀

