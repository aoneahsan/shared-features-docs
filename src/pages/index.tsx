import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

type Feature = {
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    title: 'Feature flags',
    body: 'Toggle features, lock API versions, surface deprecation warnings, and flip a maintenance mode across every app at once — driven from one Firestore document.',
  },
  {
    title: 'Cross-promotion ads',
    body: 'Promote your other products in any app with five drop-in ad components and ten display variants. Impressions, clicks, and frequency capping are handled for you.',
  },
  {
    title: 'In-app broadcasts',
    body: 'Send banner, modal, toast, and bell-center notifications with priority levels and scheduling. Dismissals are tracked per device so users are never nagged twice.',
  },
  {
    title: 'Common profile data',
    body: 'Read shared contact, social, address, payment, services, skills, and testimonial data so the same facts stay consistent everywhere — edit once, update everywhere.',
  },
  {
    title: 'One admin panel',
    body: 'All content is authored in the aoneahsan.com admin panel and stored in shared Firestore collections. Apps only read (and write analytics) — no per-app content duplication.',
  },
  {
    title: 'React + Capacitor native',
    body: 'Built on Radix UI and Zustand, with Capacitor Preferences for native persistence. Everything is a peer dependency, so nothing is bundled twice in your app.',
  },
];

function HomepageHeader(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/getting-started/quick-start">
            Quick Start — 5 min
          </Link>
          <Link className="button button--secondary button--lg" to="/intro">
            Introduction
          </Link>
          <Link className="button button--outline button--lg" href="https://www.npmjs.com/package/shared-features">
            View on npm
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.featuresWrap}>
      <div className="container">
        <div className="row">
          {FEATURES.map((f) => (
            <div key={f.title} className="col col--4" style={{ marginBottom: '1.5rem' }}>
              <div className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureBody}>{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AuthorStrip(): ReactNode {
  return (
    <section className={styles.authorStrip}>
      <div className="container">
        <p>
          Built and maintained by{' '}
          <Link href="https://aoneahsan.com">Ahsan Mahmood</Link> —{' '}
          <Link href="https://linkedin.com/in/aoneahsan">LinkedIn</Link> ·{' '}
          <Link href="https://github.com/aoneahsan">GitHub</Link> ·{' '}
          <Link href="https://www.npmjs.com/~aoneahsan">npm</Link>
        </p>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — Ads, Broadcasts, Feature Flags for React + Capacitor`}
      description="Documentation for shared-features: centralized cross-promotion ads, in-app broadcasts, feature flags, and common profile data for React + Capacitor apps, managed from one admin panel."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <AuthorStrip />
      </main>
    </Layout>
  );
}
