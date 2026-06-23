---
id: notification-events
title: Notification Events
sidebar_label: Notification Events
sidebar_position: 5
description: Use the shared-features notification event system — a typed event registry plus a double-curly-brace templating engine — to turn app events into consistent, formatted notifications.
keywords: [notification events, event registry, templating, interpolate, useNotificationEvents, templates]
---

# Notification Events

**The notification event system pairs a typed event registry with a `{{placeholder}}` templating engine** so app-driven notifications (welcome, weekly report, promotion, system alert, activity) share one consistent format across your portfolio. It is exported from `shared-features/notifications`.

## Two halves

1. **Templating engine** — turns a template string + a context object into a finished message.
2. **Event registry + standard templates** — a catalogue of known event types and their default copy.

## Templating engine

```tsx
import { interpolate, interpolateWithFormatters, defaultFormatters } from 'shared-features/notifications';

interpolate('Welcome to {{appName}}, {{userName}}!', {
  appName: 'ZTools',
  userName: 'Ahsan',
});
// "Welcome to ZTools, Ahsan!"
```

| Export | Purpose |
|--------|---------|
| `interpolate(template, context, options?)` | Replace `{{var}}` placeholders from a context object. |
| `interpolateWithFormatters(template, context, formatters?)` | Interpolate with named value formatters (dates, numbers, …). |
| `extractVariables(template)` | List the variable names a template uses. |
| `validateContext(template, context)` | Check that a context supplies every variable a template needs. |
| `defaultFormatters` | Built-in formatters you can extend. |

Types `TemplateContext` and `InterpolateOptions` are exported for typing your contexts.

## Event registry

```tsx
import {
  STANDARD_EVENTS,
  eventRegistry,
  getEventDefinition,
  getEventsByCategory,
  registerCustomEvent,
  getAllEventTypes,
} from 'shared-features/notifications';

const def = getEventDefinition('account.welcome');
registerCustomEvent({ /* your custom event definition */ });
```

| Export | Purpose |
|--------|---------|
| `STANDARD_EVENTS` | The built-in catalogue of event types. |
| `eventRegistry` | The live registry instance. |
| `getEventDefinition(type)` | Look up one event's definition. |
| `getEventsByCategory(category)` | All events in a category. |
| `registerCustomEvent(def)` | Add your own event type. |
| `getAllEventTypes()` | Every registered event type. |

## Standard templates

Prebuilt template sets grouped by category:

```tsx
import {
  ACCOUNT_TEMPLATES,
  REPORT_TEMPLATES,
  PROMOTIONAL_TEMPLATES,
  SYSTEM_TEMPLATES,
  ACTIVITY_TEMPLATES,
  ALL_STANDARD_TEMPLATES,
  getTemplateByEventType,
  getTemplatesByCategory,
  getEnabledTemplates,
} from 'shared-features/notifications';
```

## The hook

```tsx
import { useNotificationEvents } from 'shared-features/notifications';

function useWelcome(userName: string) {
  const events = useNotificationEvents(/* options */);
  // build + dispatch a formatted notification from an event type + context
}
```

`useNotificationEvents(options?)` takes `UseNotificationEventsOptions` and ties the registry + templating engine together for your app's notification flow.

## FAQ

**Is this the same as broadcasts?**
No. [Broadcasts](./broadcasts.md) are admin-authored messages pushed to apps. Notification events are an **app-side** toolkit for formatting your own app-generated notifications consistently. They complement each other.

**Can I add my own event types?**
Yes — `registerCustomEvent()` adds to the registry at runtime; `interpolate()` works with any template string and context.

See the [API overview](../reference/api-overview.md) for the full export list.
