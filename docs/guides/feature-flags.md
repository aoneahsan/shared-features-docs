---
id: feature-flags
title: Feature Flags
sidebar_label: Feature Flags
sidebar_position: 1
description: Use the shared-features feature-flag system to toggle features, lock API versions, surface deprecation warnings, and flip a global maintenance mode across every consuming app from one Firestore document.
keywords: [feature flags, useFeatureFlags, useFeature, useFeatureGate, maintenance mode, deprecation, version locking]
---

# Feature Flags

**The feature-flag system lets you enable/disable features, lock API versions, warn about deprecations, and flip a global maintenance mode across every app at once** — all driven by a single Firestore document (`zaions_feature_flags`). Apps read it; the admin writes it.

## Why use feature flags

- **Version control** — roll out breaking changes gradually instead of all at once.
- **Feature toggles** — turn a feature on or off everywhere without redeploying apps.
- **Deprecation warnings** — tell apps to upgrade before you force them to.
- **Maintenance mode** — show a maintenance screen across the whole portfolio from one switch.
- **Targeting** — enable a feature only for specific platforms or projects.

## Check overall status

```tsx
import { useFeatureFlags } from 'shared-features';

function App() {
  const {
    status,
    loading,
    isFeatureAvailable,
    hasDeprecatedFeatures,
    hasUpgradeRequired,
  } = useFeatureFlags();

  if (loading) return <Spinner />;

  if (status?.maintenanceMode) {
    return <MaintenancePage message={status.maintenanceMessage} />;
  }

  if (isFeatureAvailable('campaigns')) {
    return <Promotions />;
  }

  return <App />;
}
```

`useFeatureFlags(options?)` accepts `{ autoRefresh?, refreshInterval?, autoFetch? }` and returns `status`, `loading`, `error`, `refetch`, `isFeatureAvailable(id)`, `getFeatureAvailability(id)`, `hasDeprecatedFeatures`, and `hasUpgradeRequired`.

## Check a single feature

```tsx
import { useFeature } from 'shared-features';

function ContactSection() {
  const { available, loading, deprecated, deprecationWarning } = useFeature('contactInfo');

  if (loading) return <Spinner />;
  if (!available) return <LegacyContactInfo />;
  if (deprecated) logger.warn(deprecationWarning);

  return <NewContactInfo />;
}
```

`useFeature(featureId)` returns `available`, `loading`, `enabled`, `deprecated`, `upgradeRequired`, `deprecationWarning`, and `unavailableReason`.

## Conditional rendering with a gate

```tsx
import { useFeatureGate } from 'shared-features';

function MyComponent() {
  const { shouldRender, FallbackOrChildren } = useFeatureGate('socialLinks');

  return (
    <FallbackOrChildren fallback={<OldSocialLinks />}>
      <NewSocialLinks />
    </FallbackOrChildren>
  );
}
```

## React to changes in real time

```tsx
import { useFeatureFlagsSubscription } from 'shared-features';

useFeatureFlagsSubscription((status) => {
  if (status?.maintenanceMode) showMaintenanceBanner(status.maintenanceMessage);
});
```

There is also `useSharedFeaturesOperational()` for a quick boolean "is shared-features working right now" check.

## Available feature ids

| Feature id | Description |
|------------|-------------|
| `campaigns` | Advertising campaigns |
| `broadcasts` | Broadcast notifications |
| `contactInfo` | Contact information |
| `developerInfo` | Developer information |
| `socialLinks` | Social media links |
| `paymentOptions` | Payment methods |
| `addressInfo` | Address information |
| `services` | Professional services |
| `skills` | Skills display |
| `testimonials` | Client testimonials |
| `projects` | Portfolio projects |

:::note
Whether each id is "enabled" at runtime is decided by the admin's `zaions_feature_flags` document — it is not hard-coded in the package. A feature showing as unavailable means the admin has not enabled it, not that the code is missing.
:::

## The version-locking lifecycle

1. The admin bumps a feature's version in `zaions_feature_flags`.
2. Apps still on the old version get **deprecation warnings** (`deprecated: true`).
3. Once the admin bumps `minVersion` past the app's version, the app gets **`upgradeRequired: true`**.
4. The app updates its code and bumps `featureVersions` in `initSharedFeatures()`.

```tsx
initSharedFeatures({
  // ...firebaseConfig, projectId, projectName, platform
  featureVersions: {
    campaigns: 1,
    broadcasts: 1,
    contactInfo: 2, // moved to v2 API
  },
});
```

## FAQ

**What happens if the flags document does not exist yet?**
The hooks resolve to a safe default — features behave as unavailable rather than erroring. Use `initializeFeatureFlags()` (a service helper) from the admin side to seed it.

**Does checking a flag cost a Firestore read every render?**
No. Flags are fetched once and cached; `useFeatureFlagsSubscription` uses a single realtime listener. Use `clearFeatureFlagsCache()` to force a refresh.

**Can I gate by platform?**
Yes — the admin can scope a feature to specific platforms/projects, and the `platform`/`projectId` you pass to `initSharedFeatures()` is what the flag is evaluated against.

See the [hooks reference](../reference/hooks.md) and [services reference](../reference/services.md) for full signatures.
