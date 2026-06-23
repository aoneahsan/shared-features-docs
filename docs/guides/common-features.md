---
id: common-features
title: Common Features (Profile Data)
sidebar_label: Common Features
sidebar_position: 4
description: Read shared contact, developer, social, address, payment, services, skills, testimonials, and project data across every app with the shared-features common-features hooks and ready-made profile cards.
keywords: [common features, contact info, social links, testimonials, ContactCard, FooterSection, useContactInfo, useSocialLinks]
---

# Common Features (Profile Data)

**The common-features system shares profile data — contact, developer, social, address, payment, services, skills, testimonials, and projects — across every app so the same facts stay consistent everywhere.** Edit once in the admin panel; every app reads the same values.

## Why this exists

Your footer's email, your "follow me" links, your payment options, and your testimonials are the same in every app. Hard-coding them means ten places to update when one changes. Common features makes them a single shared source.

## Hooks

Each data type has a typed hook. Single-record hooks return `UseCommonFeatureResult<T>` (`{ data, loading, error, refetch }`); list hooks return `UseCommonFeaturesListResult<T>` (`{ data: T[], loading, error, refetch }`).

| Hook | Returns | Shape |
|------|---------|-------|
| `useContactInfo(options?)` | Contact info | single |
| `useDeveloperInfo(options?)` | Developer info | single |
| `useAddressInfo(options?)` | Address info | single |
| `useSocialLinks(options?)` | Social links | list |
| `usePaymentOptions(options?)` | Payment options | list |
| `useServices(options?)` | Services | list |
| `useSkills(options?)` | Skills | list |
| `useTestimonials(options?)` | Testimonials | list |
| `useProjects(options?)` | Projects | list |
| `useProject(slug, options?)` | One project by slug | single |

```tsx
import { useContactInfo, useSocialLinks } from 'shared-features';

function Footer() {
  const { data: contact, loading } = useContactInfo();
  const { data: socials } = useSocialLinks({ showIn: 'footer', activeOnly: true });

  if (loading || !contact) return null;

  return (
    <footer>
      <a href={`mailto:${contact.email}`}>{contact.email}</a>
      <nav>
        {socials.map((s) => (
          <a key={s.id} href={s.url}>{s.platform}</a>
        ))}
      </nav>
    </footer>
  );
}
```

### Common options

- `autoFetch` (default `true`) — fetch on mount.
- `realtime` (default `false`) — subscribe to live updates for the single-record hooks (`useContactInfo`, `useDeveloperInfo`).
- List hooks add filters such as `showIn`, `activeOnly` (and per-type options like `FetchSkillsOptions`, `FetchTestimonialsOptions`, …).

## Ready-made components

If you do not want to build the UI yourself, the package exports themed cards:

| Component | Renders |
|-----------|---------|
| `ContactCard` | Contact details |
| `DeveloperCard` | Developer bio/links |
| `SocialLinksBar` | A row of social links |
| `AddressCard` | Address block |
| `SkillsDisplay` | Skills list/grid |
| `TestimonialsGrid` | Testimonials grid |
| `ServicesGrid` | Services grid |
| `FooterSection` | A composed footer using the above |

```tsx
import { FooterSection } from 'shared-features';

<FooterSection />
```

## Caching

Each data type is cached after the first fetch. Clear helpers are exported per type (`clearContactInfoCache`, `clearSocialLinksCache`, …) plus `clearAllCommonFeaturesCache()` to reset everything.

## FAQ

**Are these features always available?**
Availability is gated by the [feature flags](./feature-flags.md) (`contactInfo`, `socialLinks`, …). Combine `useFeature('contactInfo')` with `useContactInfo()` if you want to fall back to legacy local data when the admin has not enabled the shared version.

**Can I write this data from my app?**
The read hooks are for consuming apps. Write operations (`saveContactInfo`, `createSocialLink`, …) exist in the admin services layer and are intended for the admin panel, not normal apps.

See the [services reference](../reference/services.md) for the full read/write API and the [types reference](../reference/types.md) for the data shapes.
