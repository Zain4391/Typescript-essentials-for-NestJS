# TypeScript NestJS Essentials

## Project Structure

```
typescript-nestjs-essentials/
├── src/
│   ├── modules/          # Code for each module
│   │   ├── module1/
│   │   ├── module2/
│   │   └── ...
│   ├── exercises/        # Practice exercises
│   ├── capstone/         # Final project
│   └── index.ts          # Main entry point
├── dist/                 # Compiled JavaScript output
├── node_modules/
├── package.json
├── tsconfig.json         # TypeScript configuration
└── .gitignore
```

## Getting Started

### Clone the Repository

```bash
# Clone the repository
git clone <repo_url>

cd <repo_url>
```

### Install Dependencies

```bash
# Install dependencies
npm install
```

## Development Commands

### One-time Execution

Run the TypeScript files once:

```bash
npm run dev
```

### Hot Reload Development

Start development with automatic reloading on file changes:

```bash
npm run watch
```

### Build Project

Compile TypeScript files and transpile to JavaScript:

```bash
npm run build
```

The compiled JavaScript files will be output to the `dist/` directory.
