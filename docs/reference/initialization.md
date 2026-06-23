---
id: initialization
title: Initialization API
sidebar_label: Initialization
sidebar_position: 2
description: Reference for the shared-features initialization functions — initSharedFeatures, getConfig, isInitialized, and the Firebase handle accessors.
keywords: [initSharedFeatures, getConfig, isInitialized, getSharedFeaturesDb, getDeviceId, SharedFeaturesConfig]
---

# Initialization API

All initialization functions are exported from the root `shared-features` entry.

## `initSharedFeatures(config)`

Initializes the package: creates (or reuses) the Firebase app, wires Firestore, and stores the config used by every hook/service. Call it once at startup.

```ts
interface SharedFeaturesConfig {
  firebaseConfig: FirebaseConfig;
  projectId: string;     // stable id for this app, e.g. 'ztools'
  projectName: string;   // human-readable name, e.g. 'ZTools'
  platform: 'web' | 'android' | 'ios' | 'extension';
  debug?: boolean;
  featureVersions?: ConsumerFeatureVersions;
}

initSharedFeatures(config: SharedFeaturesConfig): void;
```

See [Configuration](../getting-started/configuration.md) for field-by-field details.

## `isInitialized()`

```ts
isInitialized(): boolean;
```

Returns `true` once `initSharedFeatures()` has run successfully. Hooks and components already guard on this internally (returning idle state / `null`), so you only need it for your own conditional logic.

## `getConfig()`

```ts
getConfig(): SharedFeaturesConfig | null;
```

Returns the resolved configuration, or `null` if not initialized.

## Firebase handle accessors

| Function | Returns |
|----------|---------|
| `getSharedFeaturesApp()` | The Firebase `FirebaseApp` instance. |
| `getSharedFeaturesDb()` | The Firestore instance. |
| `getSharedFeaturesAuth()` | The Firebase Auth instance. |
| `getDeviceId()` | A stable per-device id used for frequency capping / analytics. |

```ts
import { getSharedFeaturesDb, getDeviceId } from 'shared-features';

const db = getSharedFeaturesDb();      // Firestore | null before init
const deviceId = await getDeviceId();  // stable id for this device
```

:::note
These accessors return `null` before initialization. Treat them as advanced escape hatches — prefer the hooks and services for everyday use.
:::
