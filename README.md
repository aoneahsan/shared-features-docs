# shared-features docs

Public documentation for [`shared-features`](https://www.npmjs.com/package/shared-features), the package
that provides feature flags, cross-promotion, broadcasts, notification events, and shared profile data for
React and Capacitor applications.

- **Live site:** <https://shared-features-docs.aoneahsan.com>
- **Package source:** <https://github.com/aoneahsan/shared-features>
- **npm package:** <https://www.npmjs.com/package/shared-features>
- **Package version documented:** `0.1.16`

## Local work

```bash
yarn install --immutable
yarn typecheck
yarn build
yarn serve
```

The production build is written to `build/`. A push to `main` runs the GitHub Pages workflow, and
`static/CNAME` preserves the custom domain.

## Structure

| Path | Purpose |
|---|---|
| `docs/` | Getting started, feature guides, reference, examples, FAQ, and release history |
| `src/` | Homepage and shared styles |
| `static/` | Branding, crawler files, security contact, and CNAME |
| `docusaurus.config.ts` | Site metadata, navigation, plugins, and theme |
| `sidebars.ts` | Documentation navigation |

## Source of truth

Verify every export, type, return value, default, limitation, and example against the package repository’s
`src/` and built declarations. Never place Firebase values, provider credentials, tokens, or private keys in
this public repository.

## Publishing

Before pushing, run the immutable install, typecheck, and production build, then inspect the exact build in a
controlled browser. After the Pages workflow succeeds, verify the live home page and changed routes.

Built by [Ahsan Mahmood](https://aoneahsan.com) and released under the MIT License.
