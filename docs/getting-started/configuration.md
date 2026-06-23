---
id: configuration
title: Configuration
sidebar_label: Configuration
sidebar_position: 2
description: Configure shared-features by passing your Firebase config, projectId, projectName, and platform to initSharedFeatures(), and learn how environment variables and feature version locking work.
keywords: [initSharedFeatures, firebase config, environment variables, featureVersions, isInitialized]
---

# Configuration

**Configure `shared-features` by calling `initSharedFeatures(config)` once at app startup with your Firebase config plus a `projectId`, `projectName`, and `platform`.** Until that call succeeds the package is inert — every hook returns idle state and every component renders `null`.

## Environment variables

Add the shared Firebase web config to your app's environment (these point at the Firebase project that backs the admin panel):

```env
VITE_SHARED_FEATURES_API_KEY=
VITE_SHARED_FEATURES_AUTH_DOMAIN=
VITE_SHARED_FEATURES_PROJECT_ID=
VITE_SHARED_FEATURES_STORAGE_BUCKET=
VITE_SHARED_FEATURES_MESSAGING_SENDER_ID=
VITE_SHARED_FEATURES_APP_ID=
VITE_SHARED_FEATURES_MEASUREMENT_ID=
```

:::tip Honest framing
These are **client** Firebase keys — they are safe to ship in a web bundle (Firebase access is controlled by Firestore security rules, not by hiding the API key). The package only reads public collections and writes analytics; it never needs a service account.
:::

## Initialize the package

Call `initSharedFeatures()` before rendering any shared component — typically in `src/main.tsx`:

```tsx
import { initSharedFeatures } from 'shared-features';

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
    projectId: 'ztools',        // a stable id for THIS app
    projectName: 'ZTools',      // human-readable name for THIS app
    platform: 'web',            // 'web' | 'android' | 'ios' | 'extension'
    debug: import.meta.env.DEV, // optional verbose logging
  });
}
```

### Config fields

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| `firebaseConfig` | `FirebaseConfig` | Yes | The shared Firebase web config. |
| `projectId` | `string` | Yes | Stable id for the current app (used for ad/broadcast targeting + analytics). |
| `projectName` | `string` | Yes | Human-readable app name (used in some templates/UI). |
| `platform` | `'web' \| 'android' \| 'ios' \| 'extension'` | Yes | Lets the admin target campaigns/broadcasts per platform. |
| `debug` | `boolean` | No | Enables verbose internal logging. |
| `featureVersions` | `ConsumerFeatureVersions` | No | Pins which API versions of each feature this app supports. |

## Guard rendering with `isInitialized()`

The package never throws when uninitialized — but you can branch on it explicitly:

```tsx
import { isInitialized, getConfig } from 'shared-features';

if (isInitialized()) {
  const cfg = getConfig(); // { projectId, projectName, platform, ... }
}
```

`getConfig()` returns the resolved configuration (or `null` if you have not initialized yet). `getSharedFeaturesApp()`, `getSharedFeaturesDb()`, and `getSharedFeaturesAuth()` give you the underlying Firebase handles if you need them directly.

## Locking feature versions

When the admin introduces breaking changes to a feature, it bumps that feature's version. Apps declare which versions they support so they get **deprecation warnings** before they get **upgrade-required** errors:

```tsx
initSharedFeatures({
  // ...firebaseConfig, projectId, projectName, platform
  featureVersions: {
    campaigns: 1,
    broadcasts: 1,
  },
});
```

See the [Feature Flags guide](../guides/feature-flags.md) for the full deprecation lifecycle.

## Firestore collections

The package reads/writes these collections (prefixed `zaions_`):

| Collection | Written by | Read by |
|------------|-----------|---------|
| `zaions_feature_flags` | Admin | All apps |
| `zaions_products`, `zaions_campaigns` | Admin | All apps |
| `zaions_impressions` | Apps (analytics) | Admin |
| `zaions_broadcasts`, `zaions_notification_templates` | Admin | All apps |
| `zaions_broadcast_events` | Apps (analytics) | Admin |
| Common-feature collections (contact, social, etc.) | Admin | All apps |

## Next

You are configured — render your [first ad and broadcast](./quick-start.md).
