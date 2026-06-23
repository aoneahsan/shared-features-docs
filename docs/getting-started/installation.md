---
id: installation
title: Installation
sidebar_label: Installation
sidebar_position: 1
description: Install the shared-features package and its React, Firebase, Radix UI, Zustand, and lucide-react peer dependencies, plus the optional Capacitor Preferences plugin for native persistence.
keywords: [shared-features install, peer dependencies, react, firebase, radix-ui, zustand, capacitor preferences]
---

# Installation

**Install `shared-features` with `yarn add shared-features`, then install its peer dependencies** — React, Firebase, Radix UI Themes, Zustand, and lucide-react. The package keeps those as peers so they are never bundled twice in your app.

## 1. Add the package

```bash
yarn add shared-features
```

## 2. Add the required peer dependencies

```bash
yarn add react react-dom firebase @radix-ui/themes zustand lucide-react
```

| Peer | Minimum | Why it is needed |
|------|---------|------------------|
| `react`, `react-dom` | `>=19.2.3` | All hooks and components are React. |
| `firebase` | `>=12.8.0` | Firestore reads/writes for every system. |
| `@radix-ui/themes` | `>=3.2.1` | UI primitives for the ad and notification components. |
| `zustand` | `>=5.0.10` | Lightweight internal state for some components. |
| `lucide-react` | `>=0.562.0` | Icons used in the components. |

## 3. (Optional) Add Capacitor Preferences for native apps

```bash
yarn add @capacitor/preferences
```

`@capacitor/preferences` is an **optional** peer. When present (on Android/iOS), frequency capping and dismissal tracking persist through the native key/value store. On the web, the package falls back to `localStorage` automatically — so this is only needed for Capacitor native builds.

## 4. Wrap your app in a Radix `<Theme>`

The components use `@radix-ui/themes`, which requires a `<Theme>` ancestor:

```tsx
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

export function Root() {
  return (
    <Theme>
      <App />
    </Theme>
  );
}
```

## Package entry points

`shared-features` ships ESM, CommonJS, and TypeScript declarations, with six subpath exports so you can import only what you need:

```ts
import { initSharedFeatures } from 'shared-features';            // root: init + everything
import { AdPanel } from 'shared-features/components';            // components only
import { useCampaigns } from 'shared-features/hooks';            // hooks only
import { fetchBroadcasts } from 'shared-features/services';      // services only
import type { CampaignWithProduct } from 'shared-features/types';// types only
import { eventRegistry } from 'shared-features/notifications';   // notification events
```

The root entry re-exports everything, so `import { ... } from 'shared-features'` always works too.

## Requirements

- **Node** `>=24.13.0` for building/consuming projects (matches the package's `engines`).
- A **Firebase project** with Firestore enabled (see [Configuration](./configuration.md)).

## Next

Continue to [Configuration](./configuration.md) to wire up Firebase and call `initSharedFeatures()`.
