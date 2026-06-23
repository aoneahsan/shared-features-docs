---
id: faq
title: FAQ
sidebar_label: FAQ
sidebar_position: 2
description: Frequently asked questions about the shared-features package — what it is, how it differs from an ad network, why nothing renders, peer dependencies, privacy, and reusing it with your own Firebase project.
keywords: [shared-features faq, peer dependencies, why nothing renders, privacy, firebase, cross-promotion]
---

# Frequently Asked Questions

## What is `shared-features`?

`shared-features` is a React + Capacitor npm package that gives a portfolio of apps one shared layer for cross-promotion ads, in-app broadcasts/notifications, feature flags, and common profile data. Content is authored once in the aoneahsan.com admin panel and read by every app from shared Firestore collections.

## Is this a third-party ad network?

No. The advertising system is **first-party cross-promotion** of your own products. There is no third-party ad network, no programmatic bidding, and no third-party tracking pixels — just your products promoted across your own apps.

## Why does nothing render after I add a component?

Three usual causes, in order:

1. `initSharedFeatures()` was not called (or the Firebase config env vars are missing) — the package stays inert and components render `null`.
2. There is no active campaign/broadcast for that placement/variant in the admin panel.
3. The component is not inside a Radix `<Theme>` ancestor.

`isInitialized()` and `useSharedFeaturesOperational()` help you confirm (1).

## What are the peer dependencies?

`react`, `react-dom`, `firebase`, `@radix-ui/themes`, `zustand`, and `lucide-react` are required peers; `@capacitor/preferences` is an optional peer for native persistence. They are peers (not bundled) so your app controls the versions and nothing is duplicated.

## Do I need Capacitor?

No. On the web, frequency capping and dismissal tracking use `localStorage`. `@capacitor/preferences` is only needed for native Android/iOS builds, where it persists the same data in the native key/value store.

## How much does it cost to run?

The package itself is free and MIT-licensed. Runtime cost is just your Firebase usage — it reads a handful of small documents and writes lightweight analytics, which fits comfortably in the Firestore free tier for typical app volumes.

## Is it safe to ship the Firebase API key in my web bundle?

Yes. Firebase web API keys are client identifiers, not secrets — access is enforced by Firestore security rules, not by hiding the key. The package only reads public collections and writes analytics.

## Can I use it with my own Firebase project and admin tooling?

Yes. It is MIT-licensed. The collections are prefixed `zaions_` and the package is designed around the author's admin panel, but you can point `initSharedFeatures()` at your own Firebase project and seed/author the same collections yourself.

## How do feature versions / deprecations work?

You declare which feature versions your app supports in `featureVersions`. When the admin bumps a feature, you first get `deprecated: true` warnings, then `upgradeRequired: true` once `minVersion` passes you. See the [Feature Flags guide](./guides/feature-flags.md).

## Does it write any data from my app?

Only analytics — ad impressions/clicks/closes and broadcast views/clicks/dismissals — into the `zaions_impressions` and `zaions_broadcast_events` collections. All content writes are admin-only.

## What about the `src/templates/consumer/` files?

Those are copy-paste **templates** (notification bell, panel, store, OneSignal helper) for building a full notification center in your app. They intentionally contain "fill in your service here" placeholders — they are starting points, not finished package APIs.

## Where do I report issues?

On the package repository: [github.com/aoneahsan/shared-features](https://github.com/aoneahsan/shared-features), or email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com).
