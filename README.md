# Bunsnip

Bun-snippeter

## Core Features

 **Dual-Combobox Filtering:** Instantly isolate specific code templates by selecting functional keywords/operators or searching by exact component context. **Copy-to-Clipboard**  and 
**Modern TS Showcase:** Show snippets like `satisfies` ,`Map.prototype.getOrInsert()` and `Temporal` (time) API.
 

## Tech Stack

- **Runtime Engine & Package Manager:** [Bun](https://bun.sh)
- **UI Architecture Blueprint:** [React](https://react.dev) + [shadcn/ui](https://shadcn.com) (Radix UI primitives & Tailwind CSS)
- **Build System & Dev Server:** [Vite](https://vite.dev)

## Getting Started

### 1. Clone and Navigate
```bash
git clone https://github.com
cd bunsnip
```

### 2. Install Dependencies
Leverage Bun's high-speed package installer:
```bash
bun install
```

### 3. Launch Development Server
```bash
bun run dev
```
Open `http://localhost:5173` in your browser to interact with the workspace.

## Project Structure

```text
bunsnip/
├── src/
│   ├── components/
│   │   ├── ui/               # shadcn/ui generated primitives
│   │   ├── CodeCard.tsx      # Copyable snippet card wrapper
│   │   └── SelectDropdown.tsx# Reusable unified selection lists
│   ├── data/
│   │   └── snippets.ts       # Registry safely guarded by 'satisfies'
│   ├── App.tsx               # Orchestration and filtering logic
│   └── main.tsx              # Application entrypoint
├── package.json
└── tsconfig.json
```

## 📄 License
MIT © 2026 Risto Ikonen


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
