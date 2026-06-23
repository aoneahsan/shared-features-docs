---
id: types
title: Types API
sidebar_label: Types
sidebar_position: 6
description: Reference for the TypeScript types exported by shared-features — config, campaign, broadcast, feature-flag, and common-feature interfaces and unions.
keywords: [shared-features types, CampaignWithProduct, BroadcastNotification, FeatureId, ContactInfo, typescript]
---

# Types API

Every public type is exported from `shared-features/types` (and re-exported from the root). Import them with `import type` to keep them out of your runtime bundle.

```ts
import type { CampaignWithProduct, BroadcastNotification, FeatureId } from 'shared-features/types';
```

## Config types

From the Firebase config module:

| Type | Meaning |
|------|---------|
| `FirebaseConfig` | The Firebase web config object. |
| `ConsumerPlatform` | `'web' \| 'android' \| 'ios' \| 'extension'`. |
| `ConsumerFeatureVersions` | Map of `featureId -> supported version`. |
| `SharedFeaturesConfig` | The full `initSharedFeatures()` argument. |
| `SharedFeaturesState` | Internal resolved state. |

## Campaign / ads types

`AdPlacement`, `AdVariant`, `SmallPanelVariant`, `LargePanelVariant`, `AdAction`, `AdHistoryEntry`, `Product`, `ProductType`, `Campaign`, `CampaignStatus`, `CampaignWithProduct`, `CampaignAnalytics`, `Impression`, `RecordImpressionInput`, `TargetAudience`, `TargetPlatform`, `FetchCampaignsOptions`, `CreateCampaignInput`, `UpdateCampaignInput`, and the component prop types `AdPanelProps`, `SmallPanelProps`, `LargePanelProps`.

`CampaignWithProduct` is the shape every ad component/hook works with — a campaign joined with its product (name, tagline, url, icon, color, features) plus any custom overrides (`customTitle`, `customTagline`, `customCta`, `customCtaUrl`, `customProductColor`, …) and a `variant`.

## Broadcast / notification types

`BroadcastNotification`, `BroadcastVariant` (`banner \| modal \| toast \| bell`), `BroadcastStatus`, `BroadcastAnalytics`, `BaseNotification`, `NotificationPriority`, `NotificationType`, `NotificationCategory`, `NotificationAudience`, `NotificationPlatform`, `NotificationSource`, `NotificationTemplate`, `NotificationEventDefinition`, `NotificationEventPayload`, `StandardEventType`, `UserNotification`, preference types (`NotificationPreferences`, `CategoryPreference`, `QuietHoursConfig`, `PushConfig`, `EmailDigestConfig`), the input types (`CreateBroadcastInput`, `UpdateBroadcastInput`, `CreateTemplateInput`, `CreateUserNotificationInput`), fetch options, and component prop types (`BroadcastBannerProps`, `AnnouncementModalProps`, `NotificationBellProps`, `NotificationPanelProps`, `NotificationCardProps`, `NotificationPreferencesProps`).

## Feature flag types

`FeatureId`, `FeatureAvailability`, `FeatureConfig`, `FeatureConfigs`, `FeatureFlagsDocument`, `SharedFeaturesStatus`, `ConsumerFeatureVersions`, `UpdateFeatureConfigInput`, `UpdateGlobalFlagsInput`, `UseFeatureFlagsOptions`, `UseFeatureFlagsResult`.

`SharedFeaturesStatus` carries `maintenanceMode`, `maintenanceMessage`, the per-feature availability map, deprecated/upgrade lists, and is what `useFeatureFlags().status` returns.

## Common-feature types

**Data:** `ContactInfo`, `DeveloperInfo`, `AddressInfo` (+ `AddressCoordinates`), `SocialLink` (+ `SocialPlatform`), `PaymentOption` (+ `PaymentType`, `BankDetails`, `CryptoDetails`), `Service` (+ `ServiceCategory`), `Skill` (+ `SkillCategory`, `SkillLevel`), `Testimonial`, `Project` (+ `ProjectCategory`, `ProjectStatus`, `ProjectLink`).

**Hook results:** `UseCommonFeatureResult<T>` (`{ data: T \| null, loading, error, refetch }`) and `UseCommonFeaturesListResult<T>` (`{ data: T[], loading, error, refetch }`).

**Options:** `UseCommonFeatureOptions` plus per-type fetch options (`FetchSocialLinksOptions`, `FetchServicesOptions`, `FetchSkillsOptions`, `FetchTestimonialsOptions`, `FetchPaymentOptionsOptions`, `FetchProjectsOptions`) and `CommonFeatureCollectionKey`.

:::tip
This list mirrors the package's actual exports. For exact field-level definitions, your editor's go-to-definition on any imported type jumps straight to the bundled `.d.ts`.
:::
