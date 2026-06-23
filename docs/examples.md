---
id: examples
title: Examples
sidebar_label: Examples
sidebar_position: 1
description: End-to-end examples for shared-features — a full app bootstrap, a promotional footer, a maintenance gate, a notification center, and a shared footer built from common-feature data.
keywords: [shared-features examples, bootstrap, footer ads, maintenance mode, notification center, FooterSection]
---

# Examples

Copy-paste examples that combine several parts of `shared-features`. Each assumes `initSharedFeatures()` has run and the app is inside a Radix `<Theme>`.

## 1. App bootstrap

```tsx
// src/main.tsx
import { createRoot } from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { initSharedFeatures } from 'shared-features';
import App from './App';

if (import.meta.env.VITE_SHARED_FEATURES_API_KEY) {
  initSharedFeatures({
    firebaseConfig: {
      apiKey: import.meta.env.VITE_SHARED_FEATURES_API_KEY,
      authDomain: import.meta.env.VITE_SHARED_FEATURES_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_SHARED_FEATURES_PROJECT_ID,
      storageBucket: import.meta.env.VITE_SHARED_FEATURES_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_SHARED_FEATURES_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_SHARED_FEATURES_APP_ID,
      measurementId: import.meta.env.VITE_SHARED_FEATURES_MEASUREMENT_ID,
    },
    projectId: 'ztools',
    projectName: 'ZTools',
    platform: 'web',
    debug: import.meta.env.DEV,
  });
}

createRoot(document.getElementById('root')!).render(
  <Theme>
    <App />
  </Theme>,
);
```

## 2. A promotional footer

```tsx
import { AdSlider, FooterSection } from 'shared-features';

export function Footer() {
  return (
    <footer>
      <AdSlider placement="footer_slider" />
      <FooterSection />
    </footer>
  );
}
```

`AdSlider` shows a cross-promotion if there is an active footer campaign; `FooterSection` renders your shared contact + social data. Both render nothing if there is no data.

## 3. Maintenance gate + welcome modal

```tsx
import { useFeatureFlags, AdModal, useOneTimeAdModal } from 'shared-features';

export default function App() {
  const { status, loading } = useFeatureFlags();
  const welcome = useOneTimeAdModal();

  if (loading) return null;
  if (status?.maintenanceMode) {
    return <Maintenance message={status.maintenanceMessage} />;
  }

  return (
    <>
      {welcome.shouldShow && <AdModal onClose={welcome.markAsShown} />}
      <Routes />
    </>
  );
}
```

## 4. Banner + toast broadcasts together

```tsx
import {
  BroadcastBanner, useBannerBroadcasts,
  useToastBroadcasts,
} from 'shared-features';

export function NotificationsLayer({ children }: { children: React.ReactNode }) {
  const banner = useBannerBroadcasts();
  const toast = useToastBroadcasts();

  return (
    <>
      <BroadcastBanner
        broadcasts={banner.broadcasts}
        onDismiss={banner.dismissBroadcast}
        onClick={banner.trackClick}
      />
      {children}
      {toast.broadcasts.map((t) => (
        <Toast key={t.id} onClose={() => toast.dismissBroadcast(t.id)}>
          {t.message}
        </Toast>
      ))}
    </>
  );
}
```

## 5. Custom ad UI from the hook

```tsx
import { useCampaigns } from 'shared-features';

export function PromoStrip() {
  const { campaigns, loading, recordImpression, recordClick } = useCampaigns({
    placement: 'home_banner',
    maxCampaigns: 3,
  });

  if (loading || campaigns.length === 0) return null;

  return (
    <div className="promo-strip">
      {campaigns.map((c) => (
        <button
          key={c.id}
          onMouseEnter={() => recordImpression(c)}
          onClick={() => {
            recordClick(c);
            window.open(c.product.url, '_blank', 'noopener,noreferrer');
          }}
        >
          {c.product.name} — {c.product.tagline}
        </button>
      ))}
    </div>
  );
}
```

## 6. Formatted event notification

```tsx
import { interpolate } from 'shared-features/notifications';

const message = interpolate('Your {{report}} for {{month}} is ready.', {
  report: 'usage report',
  month: 'June',
});
// "Your usage report for June is ready."
```

For more, see the [guides](./guides/feature-flags.md) and the [API reference](./reference/api-overview.md).
