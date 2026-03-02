# SiteBuilderTemplate1

A config-driven React site that deploys automatically to GitHub Pages via GitHub Actions. All customizable content lives in a single file and two images.

---

## How It Works

1. **`src/siteConfig.js`** — all text content and branding
2. **`src/images/hero.jpg`** and **`src/images/logo.png`** — the two images used by the site

Push to `main` and the workflow builds and deploys automatically. It skips the deploy if `{{SITE_NAME}}` is still present in `siteConfig.js`, so partial pushes are safe.

---

## siteConfig.js Fields

```js
const raw = {
  siteName: "{{SITE_NAME}}",         // Tab title and logo alt text
  tagline: "{{TAGLINE}}",            // Text overlaid on the hero image
  aboutText: "{{ABOUT_TEXT}}",       // Home page body copy (supports \n line breaks)
  primaryColor: "{{PRIMARY_COLOR}}", // Hex color — nav, accents, spinner

  service1: { title: "{{SERVICE1_TITLE}}", description: "{{SERVICE1_DESCRIPTION}}" },
  service2: { title: "{{SERVICE2_TITLE}}", description: "{{SERVICE2_DESCRIPTION}}" },
  service3: { title: "{{SERVICE3_TITLE}}", description: "{{SERVICE3_DESCRIPTION}}" },

  contact: {
    email: "{{CONTACT_EMAIL}}",
    phone: "{{CONTACT_PHONE}}",
    address: "{{CONTACT_ADDRESS}}"
  },

  social: {
    instagram: "{{SOCIAL_INSTAGRAM}}",
    facebook: "{{SOCIAL_FACEBOOK}}"
  }
};
```

Any field left as a placeholder (or set to `null`) is hidden automatically — services, contact, and social links are all optional.

---

## Images

| File | Where it appears |
|---|---|
| `src/images/hero.jpg` | Full-width banner with tagline overlay |
| `src/images/logo.png` | Sticky navbar — transparent PNG recommended |

---

## Deployment

The workflow (`.github/workflows/deploy.yml`) runs on every push to `main` and on `workflow_dispatch`. It uses the built-in `GITHUB_TOKEN` — no secrets needed.

### One-time Pages setup (via API)

GitHub Pages must be enabled via the API with `build_type: workflow` before the first deploy:

```
POST /repos/{owner}/{repo}/pages
{ "build_type": "workflow" }
```

This requires an admin-level token (PAT or GitHub App). After that, all deploys are handled automatically by `GITHUB_TOKEN`.

---

## Automated Setup (for the site builder service)

1. Create the repo from this template via the GitHub API
2. Replace all `{{PLACEHOLDERS}}` in `src/siteConfig.js`
3. Push `hero.jpg` and `logo.png` to `src/images/`
4. Commit and push everything to `main`
5. Enable GitHub Pages via `POST /repos/{owner}/{repo}/pages` with `{"build_type": "workflow"}`
6. Trigger the workflow via `POST /repos/{owner}/{repo}/actions/workflows/deploy.yml/dispatches` with `{"ref": "main"}`

The site will be live at `https://<username>.github.io/<repo-name>/` after the workflow completes (~2 minutes).

---

## Local Development

```bash
npm install
npm start       # dev server at http://localhost:3000
npm run build   # production build → ./build
```
