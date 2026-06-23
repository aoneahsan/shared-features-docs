import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Sidebar layout for the shared-features documentation site.
 * Every entry maps to a real `.md` file under `docs/`.
 */
const sidebars: SidebarsConfig = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/configuration',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/feature-flags',
        'guides/advertising-campaigns',
        'guides/broadcasts',
        'guides/common-features',
        'guides/notification-events',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'reference/api-overview',
        'reference/initialization',
        'reference/hooks',
        'reference/components',
        'reference/services',
        'reference/types',
      ],
    },
    'examples',
    'faq',
    'changelog',
    {
      type: 'category',
      label: 'About',
      collapsed: true,
      items: ['about-the-author'],
    },
  ],
};

export default sidebars;
