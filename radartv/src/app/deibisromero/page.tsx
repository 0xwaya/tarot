import type { Metadata } from 'next';
import Image from 'next/image';

import { PlayerLaunchButton } from '@/components/player/player-launch-button';
import { SectionHeading } from '@/components/section-heading';
import {
  bioTimeline,
  clipTracks,
  ctaBlocks,
  deibisProfile,
  liveTrack,
  serviceCards,
  siteUrl,
  socialLinks,
} from '@/content/site';
import { buildPersonSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Deibis Romero | Personal Brand Prototype',
  description:
    'Premium presentation page for Deibis Romero with biography, services, live audio access, and EPK flow.',
  alternates: {
    canonical: `${siteUrl}/deibisromero`,
  },
};

export default function DeibisRomeroPage() {
  return (
    <>
      <section className="hero shell hero--compact">
        <div className="hero__content">
          <span className="hero__eyebrow">Professional Hub</span>
          <h1>{deibisProfile.name}</h1>
          <p className="hero__subhead">{deibisProfile.role}</p>
          <p>{deibisProfile.intro}</p>
          <div className="hero__actions">
            <a className="button button--primary" href={ctaBlocks.booking.href}>
              {ctaBlocks.booking.label}
            </a>
            <a className="button button--secondary" href={ctaBlocks.epk.href}>
              {ctaBlocks.epk.label}
            </a>
          </div>
          <div className="stat-row">
            {deibisProfile.stats.map((item) => (
              <div key={item.label} className="card stat-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="hero__visual card card--feature">
          <Image alt={deibisProfile.name} height={600} src={deibisProfile.image} width={600} />
        </div>
      </section>

      <section className="shell content-block">
        <SectionHeading
          eyebrow="Live identity"
          title="The personal brand still benefits from immediate media proof."
          description="The prototype keeps live audio one click away so the credibility page never feels static or disconnected from the real audience experience."
        />
        <div className="cta-panel card card--feature">
          <div>
            <p className="kicker">Now streaming</p>
            <h3>{liveTrack.title}</h3>
            <p>{liveTrack.subtitle}</p>
          </div>
          <PlayerLaunchButton track={liveTrack} />
        </div>
      </section>

      <section className="shell content-block">
        <SectionHeading
          eyebrow="Service surface"
          title="This page should convert professional interest into a booking conversation."
          description="The build reframes the biography into a premium offer instead of leaving it as a long unstructured wall of text."
        />
        <div className="three-up">
          {serviceCards.map((item) => (
            <div key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell content-block two-column">
        <div>
          <SectionHeading
            eyebrow="Biography"
            title="A career arc that builds authority"
            description="Drawn from the current live site, condensed into milestones that are easier to scan in a presentation or by a potential partner."
          />
          <div className="timeline">
            {bioTimeline.map((item) => (
              <article key={item.year} className="timeline__item">
                <span>{item.year}</span>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="Voice samples"
            title="Clip export is still pending from the source sites"
            description="The current sounds pages expose gallery surfaces but not direct downloadable preview files. The prototype makes that constraint explicit while still surfacing the content pathways."
          />
          <div className="stack">
            {clipTracks.map((track) => (
              <article key={track.id} className="card">
                <p className="kicker">Clip pathway</p>
                <h3>{track.title}</h3>
                <p>{track.subtitle}</p>
                <PlayerLaunchButton track={track} variant="secondary" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell content-block">
        <div className="cta-panel card card--feature">
          <div>
            <p className="kicker">Digital press kit</p>
            <h3>{ctaBlocks.epk.title}</h3>
            <p>{ctaBlocks.epk.body}</p>
          </div>
          <a className="button button--primary" href={ctaBlocks.epk.href}>
            {ctaBlocks.epk.label}
          </a>
        </div>
      </section>

      <section className="shell content-block">
        <div className="social-strip card">
          {socialLinks.map((item) => (
            <a key={item.href} href={item.href} rel="noreferrer" target="_blank">
              {item.label}
            </a>
          ))}
          <a href={`mailto:${deibisProfile.email}`}>{deibisProfile.email}</a>
        </div>
      </section>

      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPersonSchema()) }}
        type="application/ld+json"
      />
    </>
  );
}
