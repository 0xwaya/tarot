import type { Metadata } from 'next';

import { SectionHeading } from '@/components/section-heading';
import { deibisProfile, siteUrl } from '@/content/site';

export const metadata: Metadata = {
  title: 'EPK | Deibis Romero',
  description: 'Digital press kit prototype for Deibis Romero.',
  alternates: {
    canonical: `${siteUrl}/epk`,
  },
};

export default function EpkPage() {
  return (
    <section className="shell epk-page">
      <SectionHeading
        eyebrow="Digital Press Kit"
        title="A presentable EPK surface is already more useful than the current static brochure flow."
        description="This prototype page is designed to become the downloadable and CRM-connected EPK in the next phase."
      />
      <div className="two-column">
        <article className="card card--feature">
          <p className="kicker">Positioning</p>
          <h2>{deibisProfile.name}</h2>
          <p>{deibisProfile.role}</p>
          <p>{deibisProfile.intro}</p>
        </article>
        <article className="card">
          <p className="kicker">Included next</p>
          <ul className="feature-list">
            <li>Biography and performance highlights</li>
            <li>Voice sample exports and platform-ready media kit assets</li>
            <li>Event history and booking contact</li>
            <li>Brand-safe imagery and downloadable package</li>
          </ul>
          <a className="button button--primary" href={`mailto:${deibisProfile.email}?subject=EPK%20Request`}>
            Request the EPK Package
          </a>
        </article>
      </div>
    </section>
  );
}
