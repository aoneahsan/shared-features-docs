---
id: changelog
title: Changelog
sidebar_label: Changelog
sidebar_position: 3
description: Release history for the shared-features npm package.
keywords: [shared-features changelog, releases, versions]
---

# Changelog

Release history for the [`shared-features`](https://www.npmjs.com/package/shared-features) npm package. The npm registry is the canonical source of published versions; this page summarizes notable changes.

## 0.1.14

- `AdPanel`'s documented `variant` prop is now functional — it renders the selected small-panel variant via `getSmallPanelVariant`, matching how `AdSlider` resolves variants. An explicit `variant` prop wins; otherwise the campaign's admin-configured variant is used (falling back to `small_panel_2`).
- Documentation site launched (this site) with full API, component, hook, service, and type reference.
- Build verified green: ESM + CJS + `.d.ts` across all six entry points; typecheck and lint clean.

## 0.1.x (earlier)

- **Feature Flags** system: version management, feature toggles, deprecation warnings, maintenance mode, platform/project targeting.
- **Advertising Campaigns** system: 5 ad components (`AdPanel`, `AdSlider`, `AdBanner`, `AdModal`, `AdUpdateModal`) + `AdCarousel`, `TopbarAdBanner`, and 10 display variants with impression/click analytics and frequency capping.
- **Broadcasts / Notifications** system: banner, modal, toast, and bell variants with priority levels, scheduling, dismissal tracking, and analytics.
- **Common Features**: shared contact, developer, social, address, payment, services, skills, testimonials, and project data with read hooks and themed cards.
- **Notification Events**: typed event registry + `{{placeholder}}` templating engine + standard template sets.
- Six subpath entry points (`/components`, `/hooks`, `/services`, `/types`, `/notifications`) plus the root.

:::note
For the exact, complete version history and publish dates, see the [versions tab on npm](https://www.npmjs.com/package/shared-features?activeTab=versions).
:::
