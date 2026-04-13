import type { Metadata } from 'next';
import Image from 'next/image';

import { PlayerLaunchButton } from '@/components/player/player-launch-button';
import { RadarVector } from '@/components/radar-vector';
import { SectionHeading } from '@/components/section-heading';
import {
  clipTracks,
  ctaBlocks,
  deibisProfile,
  liveTrack,
  radarProgramming,
  siteUrl,
  socialLinks,
  watchLiveUrl,
} from '@/content/site';
import { buildBroadcastSchema, buildOrganizationSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'El Radar TV | Media Brand Prototype',
  description:
    'Energetic media experience for El Radar TV with live stream access, clip surfaces, and content-first calls to action.',
  alternates: {
    canonical: `${siteUrl}/elradartv`,
  },
};

export default function ElRadarTvPage() {
  return (
    <>
      <section className="hero shell hero--compact">
        <div className="hero__content">
          <span className="hero__eyebrow">Media Brand</span>
          <h1>El Radar TV</h1>
          <p className="hero__subhead">Dynamic, real-time, and built around immediate access.</p>
          <p>
            The upgraded media side leads with live audio, watch-live entry points, reusable clip
            surfaces, and room for show programming, interviews, and community features.
          </p>
          <div className="hero__actions">
            <PlayerLaunchButton track={liveTrack} />
            <a className="button button--secondary" href={watchLiveUrl} rel="noreferrer" target="_blank">
              Watch Live
            </a>
          </div>
        </div>
        <div className="hero__visual card card--feature card--glow">
          <RadarVector className="hero__radar hero__radar--media" />
          <Image alt="El Radar TV presentation art" height={600} src={deibisProfile.image} width={600} />
          <div className="hero__visual-copy">
            <p className="kicker">Always visible action</p>
            <h2>Listen live, watch live, or move straight into clips.</h2>
          </div>
        </div>
      </section>

      <section className="shell content-block">
        <SectionHeading
          eyebrow="Programming grid"
          title="The content engine needs structure, not just links."
          description="The prototype sets up reusable cards that later map directly to a CMS-backed publishing model."
        />
        <div className="three-up">
          {radarProgramming.map((item) => (
            <article key={item.title} className="card card--accent-soft">
              <p className="kicker">Format</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell content-block two-column">
        <div>
          <SectionHeading
            eyebrow="Player strategy"
            title="Global playback stays mounted across route changes"
            description="For the day-one build, the audio stream uses the current public MP3 endpoint while video stays available as a direct watch-live action."
          />
          <div className="stack">
            <article className="card">
              <p className="kicker">Live audio</p>
              <h3>{liveTrack.title}</h3>
              <p>{liveTrack.subtitle}</p>
              <PlayerLaunchButton track={liveTrack} variant="secondary" />
            </article>
            <article className="card">
              <p className="kicker">Watch live</p>
              <h3>Video stream endpoint</h3>
              <p>The current site points to an HLS player URL. The prototype exposes it as a stable direct action.</p>
              <a className="button button--secondary" href={ctaBlocks.stream.href} rel="noreferrer" target="_blank">
                {ctaBlocks.stream.label}
              </a>
            </article>
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="Clip grid"
            title="The soundboard MVP is content-aware about current source limitations"
            description="Direct clip exports are not available from the legacy pages, so this prototype exposes the existing galleries and channel surfaces without pretending the files already exist."
          />
          <div className="stack">
            {clipTracks.map((track) => (
              <article key={track.id} className="card">
                <p className="kicker">Clip module</p>
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
            <p className="kicker">Community roadmap</p>
            <h3>Phase two adds moderated social, polls, and programming momentum.</h3>
            <p>
              This build keeps the media experience focused and credible for the presentation while
              leaving clear space for a community layer after approval.
            </p>
          </div>
          <div className="social-strip social-strip--compact">
            {socialLinks.map((item) => (
              <a key={item.href} href={item.href} rel="noreferrer" target="_blank">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify([buildOrganizationSchema(), buildBroadcastSchema()]) }}
        type="application/ld+json"
      />
    </>
  );
}
