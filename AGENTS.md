# AGENTS.md — shared-features-docs

> AI agent instructions for the shared-features documentation site.

## Task Speed Over Docs (IRON-SOLID — BEHAVIORAL)

Finish the real task fast + correctly FIRST; docs/trackers are a footnote (≤~20%). Edit/delete over add. Full rule: `~/.claude/CLAUDE.md`.

## Identity

| Key | Value |
|---|---|
| Repo | `shared-features-docs` (PUBLIC) |
| Type | Docusaurus 3 docs site |
| Package manager | yarn (Yarn Berry, node-modules linker) — NEVER npm/pnpm |
| Source package | `shared-features` v0.1.14 (github.com/aoneahsan/shared-features) |
| Sibling | `/home/ahsan/Documents/01-code/projects/shared-features/` |
| Content tracker | `docs/tracking/shared-features-docs-content-tracker.json` |
| Build gates | `yarn typecheck` exit 0 · `yarn build` exit 0 |
| Hosting | Firebase Hosting (primary) + GitHub Pages (fallback, `static/CNAME`) |

## Rules

1. **Yarn only.** Never npm/pnpm. Only `yarn.lock`.
2. **No dev/preview servers** in agent runs — verify with one-shot `yarn build` + `yarn typecheck`.
3. **Source-accurate.** Every documented export must exist in the `shared-features` package source. Every sidebar entry must map to a real `.md` file or the build throws (`onBrokenLinks: 'throw'`).
4. **Honest framing.** State what the package does NOT do. No fabricated stats/claims.
5. **No secrets.** Public repo — never commit env values/keys.
6. **One commit per change set**, pushed to remote `o`.
7. **SEO/AEO:** keep `static/robots.txt` AI-bot allowlist, `static/llms.txt`, and the JSON-LD in `docusaurus.config.ts` current.

## Re-run contract

Read the content tracker, diff exports against `shared-features/src/*/index.ts`, update `reference/*` + `changelog` if APIs changed, run build gate, bump `lastUpdated`, one commit.

## Gitignore Hygiene (IRON-SOLID)
`.gitignore` stays current with the project structure — ignore only recoverable artifacts (build/`dist`/`www`/`node_modules`/logs/caches/IDE), never lose source. Custom rules always present: `*.ignore.*`, `project-record-ignore/`. This is a **PUBLIC** repo -> secrets/`.env`/keystores are NEVER tracked.
Full rule + private/public protocol: `~/.claude/rules/project-config.md`.
Gitignore Last Verified: 2026-06-24

## Last Updated

2026-06-23
