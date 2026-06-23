---
id: components
title: Components API
sidebar_label: Components
sidebar_position: 4
description: Reference for every React component exported by shared-features — ad components, notification components, common-feature cards, and the variant utilities.
keywords: [AdPanel, AdSlider, AdBanner, AdModal, BroadcastBanner, ContactCard, FooterSection, components reference]
---

# Components API

All components are exported from `shared-features` and `shared-features/components`. They use `@radix-ui/themes`, so a `<Theme>` ancestor is required. Every component self-guards: no data or not initialized → it renders `null`.

## Ad components

| Component | Key props |
|-----------|-----------|
| `AdPanel` | `placement`, `variant?`, `className?` |
| `AdSlider` | `placement?` (default `footer_slider`), `className?`, `style?` |
| `AdBanner` | `placement`, `rotationInterval?`, `maxCampaigns?` |
| `AdCarousel` | see `AdCarouselProps` |
| `TopbarAdBanner` | see `TopbarAdBannerProps` |
| `AdModal` | `onClose` |
| `AdUpdateModal` | `onClose` |

```tsx
import { AdPanel, AdSlider, AdBanner } from 'shared-features';

<AdPanel placement="sidebar_panel" variant="small_panel_2" />
<AdSlider placement="footer_slider" />
<AdBanner placement="home_banner" rotationInterval={10000} maxCampaigns={5} />
```

### Variant utilities

The package also exports the individual variant components and resolver helpers, so you can render variants directly:

```ts
import {
  // small (5)
  MinimalVariant, TaglineVariant, FeaturesVariant, GradientVariant, CardVariant,
  SMALL_PANEL_VARIANTS, getSmallPanelVariant,
  // large (5)
  HeroVariant, FeatureGridVariant, TestimonialVariant, ComparisonVariant, VideoVariant,
  LARGE_PANEL_VARIANTS, getLargePanelVariant,
} from 'shared-features/components';

const Variant = getSmallPanelVariant('small_panel_3');
// <Variant campaign={campaign} onCTAClick={...} onClose={...} />
```

Variant components take `SmallPanelProps` / `LargePanelProps` = `{ campaign, onCTAClick?, onClose? }`. The CTA opens the campaign URL itself after calling `onCTAClick`.

## Notification components

| Component | Key props |
|-----------|-----------|
| `BroadcastBanner` | `broadcasts`, `onDismiss`, `onClick` |
| `AnnouncementModal` | announcement broadcast + dismiss handler |

```tsx
import { BroadcastBanner, useBannerBroadcasts } from 'shared-features';

const { broadcasts, dismissBroadcast, trackClick } = useBannerBroadcasts();
<BroadcastBanner broadcasts={broadcasts} onDismiss={dismissBroadcast} onClick={trackClick} />
```

## Common-feature components

| Component | Renders |
|-----------|---------|
| `ContactCard` | Contact details |
| `DeveloperCard` | Developer bio/links |
| `SocialLinksBar` | Row of social links |
| `AddressCard` | Address block |
| `SkillsDisplay` | Skills list/grid |
| `TestimonialsGrid` | Testimonials grid |
| `ServicesGrid` | Services grid |
| `FooterSection` | Composed footer using the above |

```tsx
import { FooterSection, ContactCard } from 'shared-features';

<FooterSection />
<ContactCard />
```

:::tip
These components fetch their own data via the common-feature hooks, so you can drop them in without wiring data manually. They render `null` until their data loads (or if the feature is disabled).
:::
