# CLAUDE.md — shared-features-docs

**Last Updated:** 2026-10-20

**Last optimized:** 2026-10-20
**Next routine optimization:** 2026-11-19

## Scope

Public Docusaurus documentation for `shared-features`. The package source is
`/home/ahsan/Documents/01-code/projects/shared-features`; its source and built declarations are authoritative
for every API claim.

| Item | Current value |
|---|---|
| Package documented | `shared-features@0.1.16` |
| Live site | `https://shared-features-docs.aoneahsan.com` |
| Hosting | GitHub Pages from `main` |
| Package manager | Yarn 4.17.1 only |
| Node | `>=18`; deployment uses Node 20 |

## Start here

Read the nearest guide pair, the page being changed, the matching package source, and `sidebars.ts` for route
changes. Do not infer current APIs from old trackers or release prose.

## Commands

```bash
yarn install --immutable
yarn typecheck
yarn build
yarn serve
```

Inspect the exact `build/` output in a controlled browser before pushing a deploy-triggering commit.

## Content rules

- Match exports, types, return values, defaults, and examples to source and built declarations.
- Describe the Firebase-backed current implementation honestly; do not perform backend work from this repo.
- Use placeholders for all project configuration and credentials.
- Update the changelog and crawler summaries when a release or public capability changes.
- Never install, import, vendor, or copy an owner-created client package, including `@perkforce/tool-kit`.

## Publishing

`.github/workflows/deploy-pages.yml` builds and deploys on pushes to `main`; `static/CNAME` owns the custom
domain. Require a successful Pages run plus HTTP and browser verification of changed routes.

## Context record

The root and `docs/` guide pairs were reviewed on 2026-10-20. Stale Firebase hosting instructions were
removed because GitHub Pages is live. Routine context work is ineligible before 2026-11-19 unless the tree
changes materially or an instruction is proven stale.

## Stop-work Git gate

<!-- RULE:stop-work-git-gate v2026-10-20 -->

Before stopping, commit every legitimate change and work-progress checkpoint in this repository and each independent nested repository, fetch and merge the designated upstream, push the documented working branch, then verify an empty worktree and `0 0` ahead/behind. Never stash, discard, reset, rebase, or force-push. If synchronization is blocked, report the exact repository, branch, blocker, and next action instead of calling the work complete. The full workflow remains authoritative in `~/.claude/rules/git-workflow.md`.
