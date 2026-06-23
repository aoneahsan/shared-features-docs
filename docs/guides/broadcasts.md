---
id: broadcasts
title: Broadcasts & Notifications
sidebar_label: Broadcasts
sidebar_position: 3
description: Send in-app broadcasts and notifications across every app with shared-features — banner, modal, toast, and bell variants, priority levels, scheduling, per-device dismissal tracking, and view/click analytics.
keywords: [broadcasts, in-app notifications, BroadcastBanner, AnnouncementModal, useBroadcasts, banner, modal, toast, bell, priority]
---

# Broadcasts & Notifications

**The broadcast system sends in-app notifications — banners, modals, toasts, and bell-center items — across every app, with priority levels, scheduling, per-device dismissal tracking, and view/click analytics.** Broadcasts are authored in the admin panel (`zaions_broadcasts`); apps render them with one component + hook.

## Ads vs broadcasts

Use **advertising campaigns** to promote products; use **broadcasts** to announce things: a new feature, a maintenance window, a tip, a critical alert. Same delivery infrastructure, different intent.

## Banner notifications

```tsx
import { BroadcastBanner, useBannerBroadcasts } from 'shared-features';

function App() {
  const { broadcasts, dismissBroadcast, trackClick } = useBannerBroadcasts();

  return (
    <>
      <BroadcastBanner
        broadcasts={broadcasts}
        onDismiss={dismissBroadcast}
        onClick={trackClick}
      />
      {/* …your app… */}
    </>
  );
}
```

## Modal notifications

```tsx
import { useModalBroadcasts } from 'shared-features';

function App() {
  const { broadcasts, dismissBroadcast } = useModalBroadcasts();
  const modal = broadcasts[0];
  if (!modal) return <YourApp />;

  return (
    <Dialog open onClose={() => dismissBroadcast(modal.id)}>
      <h2>{modal.title}</h2>
      <p>{modal.message}</p>
    </Dialog>
  );
}
```

There is also a ready-made `AnnouncementModal` component plus a `useAnnouncementModal()` hook for the common "show this important announcement once" case.

## Toast notifications

```tsx
import { useToastBroadcasts } from 'shared-features';

function App() {
  const { broadcasts, dismissBroadcast } = useToastBroadcasts();

  return (
    <>
      <YourApp />
      {broadcasts.map((t) => (
        <Toast key={t.id} onClose={() => dismissBroadcast(t.id)}>
          {t.message}
        </Toast>
      ))}
    </>
  );
}
```

## Bell / notification center

`useBellBroadcasts()` returns the broadcasts intended for an in-app notification center, so you can build a bell dropdown with an unread count. The `src/templates/consumer/` folder ships copy-paste templates (`NotificationBell`, `NotificationPanel`, `NotificationCard`, `NotificationPreferences`) you can lift into your app and wire to your own store.

## Generic hook

All the convenience hooks above wrap `useBroadcasts`:

```tsx
import { useBroadcasts } from 'shared-features';

const { broadcasts, isLoading, error, dismissBroadcast, trackClick, refresh } =
  useBroadcasts({ variant: 'banner', maxBroadcasts: 3 });
```

`useSingleBroadcast(id)` fetches one broadcast by id.

## Variants and priority

| Variant | Use case |
|---------|----------|
| `banner` | Persistent notice at the top of the page |
| `modal` | Important announcement that needs attention |
| `toast` | Brief, auto-dismissing message |
| `bell` | Notification-center item |

| Priority | Use case |
|----------|----------|
| `low` | General announcements |
| `medium` | Feature updates, tips |
| `high` | Important notices |
| `urgent` | Critical alerts, maintenance |

## Dismissal tracking

When a user dismisses a broadcast, the id is stored locally (`@capacitor/preferences` on native, `localStorage` on web) so it will not reappear. Helpers `isBroadcastDismissed(id)`, `dismissBroadcast(id)`, and `clearDismissedBroadcasts()` are exported from the services layer if you need to manage this yourself.

## Analytics

The hooks/components record impressions, clicks, and dismissals into `zaions_broadcast_events`. Low-level helpers (`trackBroadcastImpression`, `trackBroadcastClick`, `trackBroadcastDismiss`, `recordBroadcastEvent`) are available for custom UIs. The admin services (`getBroadcastAnalytics`, `getOverallAnalytics`) read them back.

## FAQ

**Can I subscribe to broadcasts in real time?**
Yes — `subscribeToBroadcasts(callback)` (services layer) gives you a live Firestore listener; the hooks use it under the hood.

**What happens with no active broadcasts?**
`broadcasts` is an empty array and the components render nothing — safe to leave mounted.

**How do I schedule a broadcast for later?**
Scheduling is set in the admin panel; the app simply respects the active window. Admin-side helpers include `scheduleBroadcast`, `publishBroadcast`, `pauseBroadcast`, and `endBroadcast`.

See the [components reference](../reference/components.md), [hooks reference](../reference/hooks.md), and the [notification events guide](./notification-events.md).
