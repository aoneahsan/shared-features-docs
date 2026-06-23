---
id: advertising-campaigns
title: Advertising Campaigns
sidebar_label: Advertising Campaigns
sidebar_position: 2
description: Cross-promote your products across apps with the shared-features advertising system — five ad components, ten display variants, placements, frequency capping, and built-in impression and click analytics.
keywords: [advertising campaigns, cross-promotion, AdPanel, AdSlider, AdBanner, AdModal, AdUpdateModal, placements, variants, impressions]
---

# Advertising Campaigns

**The advertising system cross-promotes your products across every app using drop-in ad components, ten display variants, placement targeting, frequency capping, and automatic impression/click analytics.** Campaigns and products are authored in the admin panel; apps just choose a placement.

## The pieces

- **Products** (`zaions_products`) — what you promote: name, tagline, URL, icon, color, features.
- **Campaigns** (`zaions_campaigns`) — which product shows where: placement, variant, targeting, custom copy, frequency cap.
- **Impressions** (`zaions_impressions`) — analytics the apps write back.

## Drop-in usage

```tsx
import { AdPanel, AdSlider } from 'shared-features';

<AdPanel placement="sidebar_panel" />
<AdSlider placement="footer_slider" />
```

Each component fetches an eligible campaign for the placement, records an impression on first display, and renders the configured variant. No campaign or not initialized → renders `null`.

## Ad components

| Component | Use it for |
|-----------|-----------|
| `AdPanel` | A single compact panel (sidebar/footer/settings). Honors a `variant` prop. |
| `AdSlider` | A small auto-rotating promotional panel. |
| `AdBanner` | A persistent banner with rotation + progress indicators. |
| `AdCarousel` | A multi-campaign carousel. |
| `TopbarAdBanner` | A slim banner pinned to the top of the page. |
| `AdModal` | A one-time welcome modal (first visit). |
| `AdUpdateModal` | A carousel modal shown when the app version changes. |

### AdPanel with an explicit variant

```tsx
<AdPanel placement="sidebar_panel" variant="small_panel_2" />
```

When you pass `variant`, that layout wins. When you omit it, `AdPanel` honors the campaign's own admin-configured variant, falling back to `small_panel_2` — the same resolution `AdSlider` uses, so explicit and admin-driven variants stay consistent.

### One-time and update modals

```tsx
import { AdModal, useOneTimeAdModal, AdUpdateModal, useUpdateAdModal } from 'shared-features';

function App() {
  const welcome = useOneTimeAdModal();
  const update = useUpdateAdModal(); // pass the current version to detect changes

  return (
    <>
      {welcome.shouldShow && <AdModal onClose={welcome.markAsShown} />}
      {update.shouldShow && <AdUpdateModal onClose={update.markAsShown} />}
    </>
  );
}
```

## Placements

| Placement | Where it renders | Recommended variants |
|-----------|------------------|----------------------|
| `popup_slider` | Extension popup | small |
| `options_panel` | Extension options page | small |
| `onetime_modal` | First-visit welcome modal | large |
| `update_modal` | Version-update modal | large |
| `notification` | Push notification | — |
| `footer_slider` | Web app footer | small |
| `sidebar_panel` | Web app sidebar | small |
| `home_banner` | Home page hero | large |

## Display variants

**Small (compact spaces):** `small_panel_1` Minimal · `small_panel_2` Tagline · `small_panel_3` Features · `small_panel_4` Gradient · `small_panel_5` Card.

**Large (feature areas):** `large_slider_1` Hero · `large_slider_2` Feature Grid · `large_slider_3` Testimonial · `large_slider_4` Comparison · `large_slider_5` Video.

The admin sets a campaign's variant; `AdSlider`/`AdUpdateModal`/`AdPanel` resolve it to the matching component via `getSmallPanelVariant` / `getLargePanelVariant` (both exported if you want to render variants yourself).

## Build your own ad UI

If the built-in components do not fit, drive everything from `useCampaigns`:

```tsx
import { useCampaigns } from 'shared-features';

function Footer() {
  const { campaigns, loading, recordImpression, recordClick } = useCampaigns({
    placement: 'footer_slider',
    maxCampaigns: 5,
  });

  if (loading || campaigns.length === 0) return null;

  return (
    <div>
      {campaigns.map((c) => (
        <div
          key={c.id}
          onMouseEnter={() => recordImpression(c)}
          onClick={() => {
            recordClick(c);
            window.open(c.product.url, '_blank', 'noopener,noreferrer');
          }}
        >
          <h3>{c.product.name}</h3>
          <p>{c.product.tagline}</p>
        </div>
      ))}
    </div>
  );
}
```

`useCampaign({ placement })` is the single-campaign variant used by `AdPanel`/`AdSlider`.

## Frequency capping

Ads are capped per campaign (default ~20 days between impressions for the same user). Eligibility is tracked locally via `@capacitor/preferences` on native and `localStorage` on web, so a user is not shown the same campaign repeatedly. The eligibility helpers (`isEligibleForCampaign`, `getEligibleCampaignIds`, `getCampaignHistory`) are exported from the services layer.

## FAQ

**Are these third-party ads?**
No. This is first-party cross-promotion of your own products — there is no third-party ad network, no tracking pixels, and no programmatic bidding.

**Do I have to use the components?**
No. `useCampaigns`/`useCampaign` give you the data and the analytics callbacks; render it however you like.

**What if there are no active campaigns?**
Every component renders `null` and `useCampaigns` returns an empty array, so it is always safe to leave ad slots mounted.

See the [components reference](../reference/components.md) and [hooks reference](../reference/hooks.md) for full prop and return types.
