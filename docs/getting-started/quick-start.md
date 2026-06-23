---
id: quick-start
title: Quick Start
sidebar_label: Quick Start
sidebar_position: 3
description: Render your first cross-promotion ad, broadcast banner, and feature-flag gate with shared-features in about five minutes after installing and initializing the package.
keywords: [shared-features quick start, AdPanel, BroadcastBanner, useFeatureFlags, example]
---

# Quick Start

**This guide gets a working ad, a broadcast banner, and a feature gate on screen in about five minutes**, assuming you have already [installed](./installation.md) and [configured](./configuration.md) the package.

## Prerequisites

- `initSharedFeatures()` is called at startup (see [Configuration](./configuration.md)).
- Your app tree is wrapped in a Radix `<Theme>`.

## 1. Show a cross-promotion ad

Drop an `AdPanel` anywhere — a sidebar, a footer, a settings page. It fetches an eligible campaign for the placement, records an impression, and renders one of the small panel variants. If there is no campaign (or the package is not initialized), it renders nothing.

```tsx
import { AdPanel } from 'shared-features';

export function Sidebar() {
  return (
    <aside>
      {/* …your sidebar… */}
      <AdPanel placement="sidebar_panel" />
    </aside>
  );
}
```

Want a rotating footer slider instead?

```tsx
import { AdSlider } from 'shared-features';

<AdSlider placement="footer_slider" />
```

## 2. Show a broadcast banner

`BroadcastBanner` plus the `useBannerBroadcasts` hook renders any active banner the admin has scheduled, with built-in dismiss + click tracking:

```tsx
import { BroadcastBanner, useBannerBroadcasts } from 'shared-features';

export function App() {
  const { broadcasts, dismissBroadcast, trackClick } = useBannerBroadcasts();

  return (
    <>
      <BroadcastBanner
        broadcasts={broadcasts}
        onDismiss={dismissBroadcast}
        onClick={trackClick}
      />
      {/* …rest of your app… */}
    </>
  );
}
```

Dismissals are remembered per device (Capacitor Preferences on native, `localStorage` on web), so a user who closes a banner will not see it again.

## 3. Gate a feature with a flag

Use `useFeatureFlags` to react to the global maintenance switch and per-feature availability:

```tsx
import { useFeatureFlags } from 'shared-features';

export function App() {
  const { status, loading, isFeatureAvailable } = useFeatureFlags();

  if (loading) return null;

  if (status?.maintenanceMode) {
    return <MaintenanceScreen message={status.maintenanceMessage} />;
  }

  return (
    <>
      {isFeatureAvailable('campaigns') && <Promotions />}
      <MainApp />
    </>
  );
}
```

## 4. Show a one-time welcome modal

`AdModal` + `useOneTimeAdModal` shows a promotional modal on a user's first visit and never again:

```tsx
import { AdModal, useOneTimeAdModal } from 'shared-features';

export function App() {
  const { shouldShow, markAsShown } = useOneTimeAdModal();
  return shouldShow ? <AdModal onClose={markAsShown} /> : null;
}
```

## What just happened

- Every component **guards itself**: no campaign / not initialized → it renders `null`, so it is always safe to mount.
- Analytics (impressions, clicks, dismissals) are recorded automatically by the hooks/components.
- All content came from the admin panel's Firestore collections — you wrote zero copy.

## Next

- Dive into each system: [Feature Flags](../guides/feature-flags.md), [Advertising](../guides/advertising-campaigns.md), [Broadcasts](../guides/broadcasts.md), [Common Features](../guides/common-features.md).
- See the full [API Reference](../reference/api-overview.md).
- Browse [end-to-end examples](../examples.md).
