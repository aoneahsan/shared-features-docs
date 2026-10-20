# CLAUDE.md — docs/

**Last optimized:** 2026-10-20
**Next routine optimization:** 2026-11-19

## Scope

Published documentation content. The sibling package repository’s source and built declarations are the
source of truth.

## Rules

- Check exact implementation before changing API reference, examples, supported platforms, or defaults.
- Preserve Docusaurus front matter and update `sidebars.ts` for route changes.
- Keep client and backend responsibilities explicit; never suggest embedding privileged credentials.
- Use placeholder configuration only and update release history when package behavior changes.

## Verify

Run `yarn typecheck` and `yarn build` from the repository root, then inspect changed routes from `build/`.

## Context record

Reviewed against the active documentation tree on 2026-10-20. Inherits the repository root guide.
