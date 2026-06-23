---
id: api-overview
title: API Overview
sidebar_label: API Overview
sidebar_position: 1
description: A complete map of every export in the shared-features package — initialization functions, React hooks, components, services, and types — grouped by subpath entry point.
keywords: [shared-features api, exports, entry points, hooks, components, services, types]
---

# API Overview

**`shared-features` exposes its API through six subpath entry points**, all re-exported from the root so `import { ... } from 'shared-features'` always works. This page is the complete map; each section links to a detailed reference.

## Entry points

| Import path | What it exports |
|-------------|-----------------|
| `shared-features` | Everything (init + config + re-exports below) |
| `shared-features/components` | Ad, notification, and profile components |
| `shared-features/hooks` | All React hooks |
| `shared-features/services` | Firestore service functions (read + admin) |
| `shared-features/types` | All TypeScript types/interfaces |
| `shared-features/notifications` | Notification event registry + templating |

## Initialization & config

From the root entry:

- `initSharedFeatures(config)` — initialize the package.
- `getConfig()`, `isInitialized()` — read config / readiness.
- `getSharedFeaturesApp()`, `getSharedFeaturesDb()`, `getSharedFeaturesAuth()`, `getDeviceId()` — underlying Firebase handles + device id.

See [Initialization](./initialization.md).

## Hooks

- **Campaigns:** `useCampaigns`, `useCampaign`, `useOneTimeAdModal`, `useUpdateAdModal`
- **Broadcasts:** `useBroadcasts`, `useBannerBroadcasts`, `useModalBroadcasts`, `useToastBroadcasts`, `useBellBroadcasts`, `useSingleBroadcast`, `useAnnouncementModal`
- **Feature flags:** `useFeatureFlags`, `useFeature`, `useFeatureGate`, `useFeatureFlagsSubscription`, `useSharedFeaturesOperational`
- **Common features:** `useContactInfo`, `useDeveloperInfo`, `useAddressInfo`, `useSocialLinks`, `usePaymentOptions`, `useServices`, `useSkills`, `useTestimonials`, `useProjects`, `useProject`

See [Hooks](./hooks.md).

## Components

- **Ads:** `AdPanel`, `AdSlider`, `AdModal`, `AdUpdateModal`, `AdBanner`, `AdCarousel`, `TopbarAdBanner` (+ small/large variant components and `getSmallPanelVariant` / `getLargePanelVariant`)
- **Notifications:** `BroadcastBanner`, `AnnouncementModal`
- **Common:** `ContactCard`, `DeveloperCard`, `SocialLinksBar`, `AddressCard`, `SkillsDisplay`, `TestimonialsGrid`, `ServicesGrid`, `FooterSection`

See [Components](./components.md).

## Services

Read services (campaigns, analytics, broadcasts, feature flags, common features) and admin services (broadcast/template management, common-feature writes). See [Services](./services.md).

## Notification events

`interpolate`, `interpolateWithFormatters`, `extractVariables`, `validateContext`, `defaultFormatters`, the event registry (`eventRegistry`, `STANDARD_EVENTS`, `getEventDefinition`, `registerCustomEvent`, …), the standard template sets, and `useNotificationEvents`. See the [Notification Events guide](../guides/notification-events.md).

## Types

Every public interface — config, campaigns, broadcasts, feature flags, common features — is exported from `shared-features/types`. See [Types](./types.md).
