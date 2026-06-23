---
id: hooks
title: Hooks API
sidebar_label: Hooks
sidebar_position: 3
description: Complete reference for every React hook exported by shared-features — campaigns, broadcasts, feature flags, and common-feature hooks, with their options and return shapes.
keywords: [useCampaigns, useBroadcasts, useFeatureFlags, useFeature, useContactInfo, hooks reference]
---

# Hooks API

All hooks are exported from `shared-features` and `shared-features/hooks`. Every hook self-guards on `isInitialized()` — before init they return idle/empty state instead of throwing.

## Campaign hooks

### `useCampaigns(options)`

```ts
interface UseCampaignsOptions {
  placement: AdPlacement;
  maxCampaigns?: number;
  autoFetch?: boolean;
}

interface UseCampaignsResult {
  campaigns: CampaignWithProduct[];
  campaign: CampaignWithProduct | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  recordImpression: (campaign: CampaignWithProduct) => Promise<void>;
  recordClick: (campaign: CampaignWithProduct) => Promise<void>;
  recordClose: (campaign: CampaignWithProduct) => Promise<void>;
}
```

### `useCampaign(options)`
Single-campaign variant (used by `AdPanel`/`AdSlider`); same shape but resolves one `campaign`.

### `useOneTimeAdModal()`
Returns `{ shouldShow, markAsShown }` for a first-visit modal.

### `useUpdateAdModal(currentVersion?)`
Returns `{ shouldShow, markAsShown }`, showing when the app version changes.

## Broadcast hooks

### `useBroadcasts(options)`

```ts
interface UseBroadcastsOptions {
  variant?: 'banner' | 'modal' | 'toast' | 'bell';
  maxBroadcasts?: number;
}

interface UseBroadcastsResult {
  broadcasts: BroadcastNotification[];
  isLoading: boolean;
  error: Error | null;
  dismissBroadcast: (id: string) => void;
  trackClick: (broadcast: BroadcastNotification) => Promise<void>;
  refresh: () => Promise<void>;
}
```

### Convenience wrappers

| Hook | Variant |
|------|---------|
| `useBannerBroadcasts()` | `banner` |
| `useModalBroadcasts()` | `modal` |
| `useToastBroadcasts()` | `toast` |
| `useBellBroadcasts()` | `bell` |

### `useSingleBroadcast(id)`
Fetches one broadcast by id.

### `useAnnouncementModal()`
Returns `UseAnnouncementModalReturn` for the `AnnouncementModal` "show once" flow.

## Feature flag hooks

### `useFeatureFlags(options?)`

```ts
interface UseFeatureFlagsOptions {
  autoRefresh?: boolean;
  refreshInterval?: number; // ms (default ~5 min)
  autoFetch?: boolean;      // default true
}

interface UseFeatureFlagsResult {
  status: SharedFeaturesStatus | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isFeatureAvailable: (featureId: FeatureId) => boolean;
  getFeatureAvailability: (featureId: FeatureId) => FeatureAvailability | null;
  hasDeprecatedFeatures: boolean;
  hasUpgradeRequired: boolean;
}
```

### `useFeature(featureId)`
Returns `{ available, loading, enabled, deprecated, upgradeRequired, deprecationWarning, unavailableReason }`.

### `useFeatureGate(featureId)`
Returns `{ shouldRender, loading, deprecated, FallbackOrChildren }` — a render-prop component for conditional UI.

### `useFeatureFlagsSubscription(callback)`
Subscribes to live flag updates; `callback(status)` fires on every change.

### `useSharedFeaturesOperational()`
A quick boolean check that the package is initialized and flags are reachable.

## Common-feature hooks

Single-record hooks return `UseCommonFeatureResult<T>` = `{ data: T | null, loading, error, refetch }`.
List hooks return `UseCommonFeaturesListResult<T>` = `{ data: T[], loading, error, refetch }`.

| Hook | Return | Notable options |
|------|--------|-----------------|
| `useContactInfo(options?)` | single `ContactInfo` | `autoFetch`, `realtime` |
| `useDeveloperInfo(options?)` | single `DeveloperInfo` | `autoFetch`, `realtime` |
| `useAddressInfo(options?)` | single `AddressInfo` | `autoFetch` |
| `useSocialLinks(options?)` | list `SocialLink` | `showIn`, `activeOnly` |
| `usePaymentOptions(options?)` | list `PaymentOption` | filters |
| `useServices(options?)` | list `Service` | filters |
| `useSkills(options?)` | list `Skill` | filters |
| `useTestimonials(options?)` | list `Testimonial` | filters |
| `useProjects(options?)` | list `Project` | filters |
| `useProject(slug, options?)` | single `Project` | `autoFetch` |

See the [types reference](./types.md) for `T` shapes and the [common features guide](../guides/common-features.md) for usage.
