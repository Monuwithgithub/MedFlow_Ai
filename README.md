<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
📋 What's Inside the README

Section	What It Contains

Badges	React, TypeScript, Tailwind, Supabase, Vercel shields

About	Project description + why you built it

Features	All 7 pages explained with bullet points

Tech Stack	Full table — Frontend + Backend + DevOps

Getting Started	Clone → Install → Run in 5 steps

Backend Setup	All 14 SQL files listed in order

Database Schema	Visual tree of all 8 tables + relationships

Project Structure	Full folder tree with every file explained

Environment Variables	.env template + security warning

Deployment	Vercel step-by-step guide

User Roles	Table showing Admin/Manager/Pharmacist/Viewer permissions

Key Metrics	7 pages, 8 tables, 20+ RLS policies, 217KB build

Contributing	Fork + PR instructions

Author	Your name + GitHub + LinkedIn + Portfolio

✅ Before Pushing to GitHub

Replace these 3 things:


YOUR_USERNAME → your actual GitHub username

YOUR_PROFILE → your LinkedIn profile URL

your-portfolio.com → your portfolio website

[🚀 Live Demo](#) → paste your actual Vercel URL

Also create this file:



# .env.example (safe to commit — no real values)

VITE_SUPABASE_URL=your_supabase_url_here

VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

Make sure .gitignore has:



.env
node_modules/
dist/
>>>>>>> 67a44c8dd15b6d567ee47e57890ed39b38539dd5
