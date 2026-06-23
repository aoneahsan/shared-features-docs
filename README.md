# shared-features-docs

Public documentation site for the [`shared-features`](https://www.npmjs.com/package/shared-features) npm package — centralized ads, broadcasts, feature flags, and common profile data for React + Capacitor apps.

- **Live (planned):** https://shared-features-docs.aoneahsan.com
- **Package:** https://www.npmjs.com/package/shared-features
- **Package source:** https://github.com/aoneahsan/shared-features
- **Built with:** [Docusaurus 3](https://docusaurus.io/), React, TypeScript
- **Hosting:** Firebase Hosting (primary) + GitHub Pages (fallback, via `static/CNAME`)
- **License:** MIT — by [Ahsan Mahmood](https://aoneahsan.com)

## Develop

This is a **yarn-only** repo (Yarn Berry, `node-modules` linker).

```bash
yarn install
yarn start       # dev server on :5962 (run it yourself; the agent never starts servers)
yarn build       # build static site to ./build
yarn typecheck   # tsc --noEmit
yarn serve       # preview the built site on :5963
```

## Deploy

Firebase Hosting (requires the `shared-features-docs` Hosting site to exist):

```bash
yarn build && npx -y firebase-tools@latest deploy --only hosting --project shared-features-docs
```

GitHub Pages: the `.github/workflows/deploy.yml` workflow builds and publishes on push to `main` (custom domain set via `static/CNAME`).

## Content map

- `docs/intro.md` — what the package is
- `docs/getting-started/` — installation, configuration, quick start
- `docs/guides/` — feature flags, advertising, broadcasts, common features, notification events
- `docs/reference/` — API overview, initialization, hooks, components, services, types
- `docs/examples.md`, `docs/faq.md`, `docs/changelog.md`, `docs/about-the-author.md`

Content is **source-accurate** to the package — every documented export exists in `shared-features`.
