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


## Sub-agents & Skills — Main-Context-First (IRON-SOLID)
Default/built-in sub-agents (`general-purpose`, `Explore`, `Plan`, `claude`, `fork`, …) do NOT have
access to `/skills`, so delegating to them silently SKIPS the skills RULE #0 requires. Do all
skill-relevant work in the **MAIN context**; use a sub-agent ONLY when a **custom** agent exists in
`.claude/agents/` for that job; a default `Explore`/`Plan` agent is allowed ONLY for read-only,
no-skill search/exploration. When a relevant skill is missing, **install/enable it** rather than
proceeding skill-less. (Owner directive 2026-07-11; full text in `~/.claude/CLAUDE.md`.)

<!-- RULE:main-context-model-workflow v2026-07-16 -->
## Main-Context + Skills + Model Workflow (IRON-SOLID — CRITICAL)
1. **NO default/built-in sub-agents** (`general-purpose`, `Explore`, `Plan`, `claude`, `fork`, …) for ANY work in
   this project — they cannot invoke /skills, which RULE #0 makes mandatory. Do ALL work (planning, implementation,
   review, exploration) in the MAIN context. A sub-agent is allowed ONLY when a CUSTOM agent exists in
   `.claude/agents/` for that exact job.
2. **Skills always:** before any task, scan the available-skills list and invoke EVERY relevant skill; if a needed
   skill is missing, download/enable/install it (or use the nearest installed equivalent and say so) — never
   proceed skill-less.
3. **Model workflow:** PLAN and REVIEW on **Fable 5**; EXECUTE the approved plan on **Opus 4.8**. Plans in
   `~/.claude/plans/`; multi-phase features keep a resumable tracker (`docs/features/<slug>/00-tracker.json`),
   resumed rather than re-planned from zero.

Global records (rules, policy, audit reports) live in the `ahsan-notebook` repo at
`static/assets/claude-code/`; the `~/.claude/…` paths are symlinks into it. Full text: `~/.claude/CLAUDE.md`.
(Owner directives 2026-07-11 / 2026-07-14; fleet-rolled 2026-07-16.)
