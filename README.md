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

---

## GitHub Pages Deployment (Fixing Blank Black Page)

If you are currently seeing a **black blank page** on your GitHub Pages URL (e.g., `https://oniel1239.github.io/Oniel/`), it is because GitHub Pages is configured to **"Deploy from a branch"** (which serves the raw, uncompiled development `index.html` at the root of your repository) instead of the built production files from the `dist` directory.

To fix this and successfully deploy your website, you must configure GitHub Pages to deploy using the automated GitHub Actions workflow (`.github/workflows/deploy.yml`) already present in this project.

### Step-by-Step Instructions to Fix

1. Open your web browser and go to your GitHub Repository:
   [https://github.com/oniel1239/Oniel](https://github.com/oniel1239/Oniel)
2. Click on the **Settings** tab at the top of the repository page.
3. In the left-hand sidebar, navigate to the **Code and automation** section and click on **Pages**.
4. In the **Build and deployment** section, locate the **Source** dropdown menu.
5. Change the selection from **Deploy from a branch** to **GitHub Actions**.
6. Once this setting is saved, push any change or go to the **Actions** tab, select the **Deploy to GitHub Pages** workflow on the left sidebar, and click the **Run workflow** button to trigger a fresh build and deploy.

### Why this happens
In a Vite React application, the root `index.html` references `/src/main.tsx` (which is a raw TypeScript React file, not understandable by browsers). When building the app (`npm run build`), Vite compiles your TypeScript code into optimized, production-ready static assets inside the `dist/` directory, and generates a `dist/index.html` that points to those compiled files.

By changing the GitHub Pages source to **GitHub Actions**, the built-in deployment workflow will automatically compile your code and deploy the `dist/` folder directly to GitHub Pages, making your tech portfolio load instantly and perfectly!
