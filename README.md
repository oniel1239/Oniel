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

## Cloudflare Pages Deployment (Automated via GitHub)

Your website is already live at [https://oniel.oliverkcw199.workers.dev/](https://oniel.oliverkcw199.workers.dev/).

### One-Time Setup (Dashboard)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Authorize Cloudflare to access your GitHub account
3. Select the repository `oniel1239/Oniel`
4. Click **Begin setup**
5. Under **Build settings**, configure:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory (optional)**: leave blank
6. Under **Environment variables (advanced)**, add:
   - `VITE_BASE_PATH` = `/`
   - `VITE_ROUTER_BASENAME` = `/`
7. Click **Save and Deploy**

After deployment, every push to your `main` branch will automatically rebuild and deploy the site to Cloudflare Pages.

### Files included for Cloudflare Pages

| File | Purpose |
|------|---------|
| `public/_redirects` | SPA fallback — all routes serve `index.html` so React Router works |
| `wrangler.toml` | Project-level configuration documenting build settings and env vars |

> ⚠️ The **environment variables** (`VITE_BASE_PATH=/` and `VITE_ROUTER_BASENAME=/`) are essential — they tell the app to use root-relative paths instead of the `/Oniel/` subpath used for GitHub Pages.

---

## Custom Domain Setup (e.g., onielrobin.com)

Once your Cloudflare Pages deployment is working, you can add a custom domain.

### Prerequisites
- You own the domain (purchased from any registrar)
- Your Cloudflare Pages project is already deployed and working

### Step-by-Step

1. **Buy the domain** (if you don't have it yet) from a registrar like Cloudflare Registrar, Namecheap, or GoDaddy

2. **Point nameservers to Cloudflare** (if the domain isn't already on Cloudflare):
   - In Cloudflare Dashboard → **Add a Site** → enter your domain
   - Cloudflare will scan DNS records and give you two nameserver addresses
   - Go to your domain registrar and update the nameservers to Cloudflare's

3. **Add the custom domain to your Pages project:**
   - Cloudflare Dashboard → **Workers & Pages** → select `oniel` project
   - Go to the **Custom domains** tab
   - Click **Set up a custom domain**
   - Enter `onielrobin.com` (or `www.onielrobin.com`)
   - Click **Activate domain**

4. **Wait for SSL provisioning** (usually 1-5 minutes, up to 24 hours for new domains)

### Apex vs. Subdomain

| Type | Example | How it works |
|------|---------|-------------|
| **Apex (bare domain)** | `onielrobin.com` | Cloudflare uses **CNAME Flattening** — no special setup needed |
| **Subdomain** | `www.onielrobin.com` | Standard CNAME record — works instantly |

> 💡 After adding the custom domain, Cloudflare automatically provisions an SSL/TLS certificate and handles all DNS routing — no additional code changes are needed since the site already uses root-relative paths (`/assets/...`) on Cloudflare.

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
