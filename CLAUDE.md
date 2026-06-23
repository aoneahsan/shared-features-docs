# CLAUDE.md — shared-features-docs

Public Docusaurus documentation site for the `shared-features` npm package.

## Task Speed Over Docs (IRON-SOLID — BEHAVIORAL)

Finish the real task fast + correctly FIRST; docs/trackers/sync are a footnote (≤~20% of effort) — never let recording outpace the fix. No new summary/status/completion files unless asked; edit/delete over add. Full rule: `~/.claude/CLAUDE.md`.

## Identity

| Key | Value |
|---|---|
| Repo | `shared-features-docs` (github.com/aoneahsan/shared-features-docs, PUBLIC) |
| Type | Docusaurus 3 documentation site (classic preset + Mermaid) |
| Package manager | yarn (Yarn Berry, `node-modules` linker; NEVER npm/pnpm) |
| Node | >=18 |
| Author | Ahsan Mahmood (aoneahsan@gmail.com) |
| Live URL (planned) | https://shared-features-docs.aoneahsan.com (Firebase Hosting site `shared-features-docs` + GitHub Pages fallback) |
| Source package | https://www.npmjs.com/package/shared-features (`shared-features` v0.1.14) |
| Sibling project | `/home/ahsan/Documents/01-code/projects/shared-features/` (the package itself) |
| Content tracker | `docs/tracking/shared-features-docs-content-tracker.json` |
| Build gates | `yarn typecheck` exit 0 · `yarn build` (→ `./build`) exit 0 |

## Critical rules

| Rule | Detail |
|---|---|
| Yarn only | Never `npm install`/`pnpm add`. |
| No dev server in agent runs | The agent runs `yarn build` + `yarn typecheck` to verify; the user runs `yarn start`/`yarn serve`. |
| Source of truth | Every API fact MUST come from the `shared-features` package source (`src/`). No invented exports/params. The sidebar entries must all map to real `.md` files (build fails otherwise). |
| Honest framing | Say what the package does NOT do as clearly as what it does. No fabricated stats. |
| One commit per batch | One commit per docs change set; push to remote `o`. |
| No secrets | Public repo — never commit env values or keys. |

## Deploy

- Firebase Hosting: `yarn build && npx -y firebase-tools@latest deploy --only hosting --project shared-features-docs` (user-only — needs Firebase auth + the Hosting site to exist).
- GitHub Pages: `.github/workflows/deploy.yml` (push to `main`); custom domain via `static/CNAME`.

## Re-run contract

On re-running the docs prompt: read `docs/tracking/shared-features-docs-content-tracker.json`, confirm the package's exports haven't changed (diff against `shared-features/src/*/index.ts`), update `reference/*` + `changelog` if they have, run the build gate, bump `lastUpdated`, one commit.

## Last Updated

2026-06-23
