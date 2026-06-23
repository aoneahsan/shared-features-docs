import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// ---------------------------------------------------------------------------
// shared-features — Documentation site config
// Author: Ahsan Mahmood (https://aoneahsan.com)
// Source package: https://www.npmjs.com/package/shared-features
// ---------------------------------------------------------------------------

const SITE_URL = 'https://shared-features-docs.aoneahsan.com';

const config: Config = {
  title: 'shared-features Docs',
  tagline:
    'Centralized ads, broadcasts, feature flags, and profile data for React + Capacitor apps — managed from one admin panel.',
  favicon: 'img/favicon.svg',

  // Production URL — served from Firebase Hosting site `shared-features-docs`
  // (and GitHub Pages via the custom domain in static/CNAME).
  url: SITE_URL,
  baseUrl: '/',

  // GitHub metadata (drives OG tags + edit-this-page links).
  organizationName: 'aoneahsan',
  projectName: 'shared-features-docs',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  // SEO + AI-citability head tags. JSON-LD payloads (WebSite, Organization,
  // SoftwareSourceCode) help Google Rich Results, Perplexity, ChatGPT, and
  // Claude extract structured entity data when citing this documentation.
  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'canonical', href: `${SITE_URL}/` },
    },
    {
      tagName: 'meta',
      attributes: { name: 'application-name', content: 'shared-features Docs' },
    },
    {
      tagName: 'meta',
      attributes: { name: 'apple-mobile-web-app-title', content: 'shared-features Docs' },
    },
    {
      tagName: 'meta',
      attributes: { name: 'theme-color', content: '#0ea5e9' },
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'shared-features Documentation',
        url: SITE_URL,
        description:
          'Documentation for shared-features, a React + Capacitor package providing centralized advertising campaigns, broadcasts/notifications, feature flags, and common profile data managed from the aoneahsan.com admin panel. Author: Ahsan Mahmood.',
        inLanguage: 'en',
        publisher: {
          '@type': 'Person',
          name: 'Ahsan Mahmood',
          url: 'https://aoneahsan.com',
          email: 'aoneahsan@gmail.com',
          sameAs: [
            'https://linkedin.com/in/aoneahsan',
            'https://github.com/aoneahsan',
            'https://www.npmjs.com/~aoneahsan',
          ],
        },
        license: 'https://opensource.org/licenses/MIT',
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: 'shared-features',
        description:
          'React + Capacitor package for centralized advertising campaigns, broadcasts/notifications, feature flags, and common profile data, driven by a Firestore-backed admin panel. MIT-licensed.',
        codeRepository: 'https://github.com/aoneahsan/shared-features',
        programmingLanguage: 'TypeScript',
        runtimePlatform: 'React, Capacitor',
        url: 'https://www.npmjs.com/package/shared-features',
        license: 'https://opensource.org/licenses/MIT',
        author: {
          '@type': 'Person',
          name: 'Ahsan Mahmood',
          url: 'https://aoneahsan.com',
        },
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Ahsan Mahmood',
        alternateName: 'aoneahsan',
        url: 'https://aoneahsan.com',
        email: 'aoneahsan@gmail.com',
        sameAs: [
          'https://linkedin.com/in/aoneahsan',
          'https://github.com/aoneahsan',
          'https://www.npmjs.com/~aoneahsan',
          'https://aoneahsan.com',
        ],
        founder: { '@type': 'Person', name: 'Ahsan Mahmood' },
      }),
    },
  ],

  i18n: { defaultLocale: 'en', locales: ['en'] },

  trailingSlash: false,

  markdown: {
    mermaid: true,
    hooks: { onBrokenMarkdownLinks: 'warn' },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/aoneahsan/shared-features-docs/edit/main/',
          showLastUpdateTime: true,
          breadcrumbs: true,
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
        sitemap: { changefreq: 'weekly', priority: 0.7, lastmod: 'date' },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.svg',
    metadata: [
      {
        name: 'description',
        content:
          'Documentation for shared-features — a React + Capacitor package for centralized advertising campaigns, broadcasts/notifications, feature flags, and common profile data. Maintained by Ahsan Mahmood.',
      },
      {
        name: 'keywords',
        content:
          'shared-features, react, capacitor, firebase, firestore, cross-promotion, advertising campaigns, in-app notifications, broadcasts, feature flags, radix ui, zustand, npm package, aoneahsan',
      },
      { name: 'author', content: 'Ahsan Mahmood' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: '@aoneahsan' },
      { name: 'twitter:site', content: '@aoneahsan' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'shared-features Docs' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'article:author', content: 'Ahsan Mahmood' },
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: { sidebar: { hideable: true, autoCollapseCategories: true } },
    navbar: {
      title: 'shared-features',
      logo: {
        alt: 'shared-features logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
        width: 32,
        height: 32,
      },
      items: [
        { type: 'docSidebar', sidebarId: 'mainSidebar', position: 'left', label: 'Docs' },
        { to: '/getting-started/quick-start', label: 'Quick Start', position: 'left' },
        { to: '/reference/api-overview', label: 'API', position: 'left' },
        { to: '/about-the-author', label: 'Author', position: 'right' },
        { href: 'https://www.npmjs.com/package/shared-features', label: 'npm', position: 'right' },
        { href: 'https://github.com/aoneahsan/shared-features', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/intro' },
            { label: 'Installation', to: '/getting-started/installation' },
            { label: 'Quick Start', to: '/getting-started/quick-start' },
            { label: 'API Overview', to: '/reference/api-overview' },
          ],
        },
        {
          title: 'Project',
          items: [
            { label: 'npm package', href: 'https://www.npmjs.com/package/shared-features' },
            { label: 'Source (package)', href: 'https://github.com/aoneahsan/shared-features' },
            { label: 'Docs source', href: 'https://github.com/aoneahsan/shared-features-docs' },
          ],
        },
        {
          title: 'Built by Ahsan Mahmood',
          items: [
            { label: 'aoneahsan.com', href: 'https://aoneahsan.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/aoneahsan' },
            { label: 'GitHub', href: 'https://github.com/aoneahsan' },
            { label: 'npm packages', href: 'https://www.npmjs.com/~aoneahsan' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ahsan Mahmood. Built with Docusaurus. shared-features is MIT-licensed.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'jsx', 'tsx', 'diff'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
