---
id: services
title: Services API
sidebar_label: Services
sidebar_position: 5
description: Reference for the shared-features Firestore service functions — campaign, analytics, broadcast, feature-flag, and common-feature read services, plus the admin write services.
keywords: [services, fetchCampaigns, fetchBroadcasts, fetchFeatureFlags, admin services, firestore]
---

# Services API

The services layer (`shared-features/services`) is the imperative API the hooks are built on. Use it directly for custom UIs, server-ish flows, or admin tooling. Functions return Promises and read/write the `zaions_*` Firestore collections.

## Campaign services

| Function | Purpose |
|----------|---------|
| `fetchCampaigns()` | All campaigns. |
| `fetchActiveCampaigns()` | Active campaigns only. |
| `getCampaignById(id)` | One campaign. |
| `fetchProducts()` | All products. |
| `getProductById(id)` | One product. |
| `clearCampaignsCache()`, `clearProductsCache()` | Invalidate caches. |

## Analytics services

| Function | Purpose |
|----------|---------|
| `recordImpression(...)`, `trackImpression(...)` | Record an ad impression. |
| `trackClick(...)`, `trackClose(...)` | Record a click / close. |
| `isEligibleForCampaign(...)` | Frequency-cap eligibility check. |
| `getEligibleCampaignIds(...)` | Ids the user is currently eligible to see. |
| `getCampaignHistory(...)` | Local impression history. |

## Broadcast services

| Function | Purpose |
|----------|---------|
| `fetchBroadcasts()`, `fetchActiveBroadcasts()` | Read broadcasts. |
| `fetchBroadcastsByVariant(variant)` | Read by variant. |
| `getBroadcastById(id)` | One broadcast. |
| `subscribeToBroadcasts(cb)` | Live listener. |
| `recordBroadcastEvent(...)` | Generic analytics write. |
| `trackBroadcastImpression / Click / Dismiss(...)` | Specific analytics writes. |
| `isBroadcastDismissed(id)`, `dismissBroadcast(id)`, `clearDismissedBroadcasts()` | Local dismissal state. |
| `clearBroadcastsCache()` | Invalidate cache. |

## Feature flag services

| Function | Purpose |
|----------|---------|
| `fetchFeatureFlags()` | Read the flags document. |
| `subscribeToFeatureFlags(cb)` | Live listener. |
| `checkFeatureAvailability(id)` | Availability for one feature. |
| `isFeatureEnabled(id)`, `getFeatureVersion(id)` | Enabled state / version. |
| `getSharedFeaturesStatus()` | Resolved status object. |
| `initializeFeatureFlags()` | Seed the flags document (admin). |
| `updateFeatureConfig(...)`, `updateGlobalFlags(...)` | Admin writes. |
| `clearFeatureFlagsCache()` | Invalidate cache. |
| `COLLECTION_FEATURE_FLAGS`, `FEATURE_FLAGS_DOC_ID` | Collection/doc constants. |

## Common-feature read services

`fetch*` + `subscribeTo*` + `clear*Cache` per data type:
`fetchContactInfo`, `fetchDeveloperInfo`, `fetchAddressInfo`, `fetchSocialLinks`, `fetchPaymentOptions`, `fetchServices`, `fetchSkills`, `fetchTestimonials`, `fetchProjects`, `fetchProjectBySlug`, plus `clearAllCommonFeaturesCache()`.

## Admin services (write side)

:::warning Admin only
The admin services write content and are intended for the aoneahsan.com admin panel — not normal consuming apps. Firestore security rules restrict writes to admins.
:::

**Notifications:** `adminNotificationService`, `createBroadcast`, `updateBroadcast`, `deleteBroadcast`, `getAllBroadcasts`, `getBroadcastsByStatus`, `publishBroadcast`, `scheduleBroadcast`, `pauseBroadcast`, `endBroadcast`, `createTemplate`, `updateTemplate`, `deleteTemplate`, `getAllTemplates`, `getTemplateById`, `getFirestoreTemplateByEventType`, `getBroadcastAnalytics`, `getOverallAnalytics`.

**Common features:** `saveContactInfo`, `updateContactInfo`, `saveDeveloperInfo`, `updateDeveloperInfo`, `saveAddressInfo`, `updateAddressInfo`, and CRUD trios for social links, payment options, services, skills, testimonials, and projects (`create*`/`update*`/`delete*`). Each has a matching `*Input` type (`ContactInfoInput`, `SocialLinkInput`, …).

See the [types reference](./types.md) for the data shapes these functions accept and return.
