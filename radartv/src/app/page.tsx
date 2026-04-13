import Image from 'next/image';
import Link from 'next/link';

import { PlayerLaunchButton } from '@/components/player/player-launch-button';
import { RadarVector } from '@/components/radar-vector';
import { SectionHeading } from '@/components/section-heading';
import {
  brandSummary,
  ctaBlocks,
  deibisProfile,
  liveTrack,
  socialLinks,
  watchLiveUrl,
  whatsappLink,
  youtubeStreamsUrl,
} from '@/content/site';
import { buildOrganizationSchema, buildPersonSchema } from '@/lib/seo/schema';
import { getTopStreams } from '@/lib/youtube-streams';

export default async function HomePage() {
  const schemas = [buildPersonSchema(), buildOrganizationSchema()];
  const topStreams = await getTopStreams(6);

  return (
    <>
      <section className="hero shell">
        <div className="hero__content">
          <span className="hero__eyebrow">Portal Oficial · Chile</span>
          <h1>
            TV y Radio en vivo, sin rodeos.
          </h1>
          <p>{brandSummary.body}</p>
          <div className="hero__actions">
            <PlayerLaunchButton track={liveTrack} />
            <a className="button button--secondary" href={watchLiveUrl} rel="noreferrer" target="_blank">
              {ctaBlocks.stream.label}
            </a>
            <a className="button button--secondary" href={whatsappLink} rel="noreferrer" target="_blank">
              WhatsApp
            </a>
          </div>
          <div className="hero__actions">
            <Link className="button button--secondary" href="/deibisromero">
              Perfil de Deibis
            </Link>
            <Link className="button button--secondary" href="/elradartv">
              El Radar TV
            </Link>
          </div>
        </div>
        <div className="hero__visual card card--feature">
          <div className="hero__visual-copy">
            <p className="kicker">En vivo primero</p>
            <h2>Acceso rapido para escuchar y ver.</h2>
            <p>
              Interfaz simplificada para priorizar reproduccion en directo y contacto inmediato.
            </p>
          </div>
          <RadarVector className="hero__radar" />
          <Image alt={deibisProfile.name} height={560} src={deibisProfile.image} width={560} />
        </div>
      </section>

      <section className="shell section-grid">
        <article className="card card--brand">
          <span className="pill">RADIO</span>
          <h3>El Radar Radio En Vivo</h3>
          <p>Escucha la senal principal 24/7 con el reproductor integrado.</p>
          <PlayerLaunchButton track={liveTrack} variant="secondary" />
        </article>
        <article className="card card--brand card--accent">
          <span className="pill">TV</span>
          <h3>El Radar TV En Vivo</h3>
          <p>Abre la transmision de video en directo en un toque.</p>
          <a className="button button--secondary" href={watchLiveUrl} rel="noreferrer" target="_blank">
            Ver TV En Vivo
          </a>
        </article>
        <article className="card card--brand">
          <span className="pill">CONTACTO</span>
          <h3>Habla con Deibis</h3>
          <p>Consulta por WhatsApp para colaboraciones, entrevistas o contrataciones.</p>
          <a className="button button--secondary" href={whatsappLink} rel="noreferrer" target="_blank">
            Abrir WhatsApp
          </a>
        </article>
      </section>

      <section className="shell content-block">
        <SectionHeading
          eyebrow="Contacto rapido"
          title="¿Quieres hablar con Deibis ahora?"
          description="Usa WhatsApp para una respuesta directa o envia consulta comercial por correo."
        />
        <div className="cta-panel card card--feature">
          <div>
            <p className="kicker">Canal recomendado</p>
            <h3>WhatsApp directo</h3>
            <p>
              Si defines NEXT_PUBLIC_WHATSAPP_NUMBER, este boton abre chat directo con mensaje precargado.
            </p>
          </div>
          <a className="button button--primary" href={whatsappLink} rel="noreferrer" target="_blank">
            Abrir WhatsApp
          </a>
        </div>
      </section>

      <section className="shell content-block">
        <SectionHeading
          eyebrow="Top Streams"
          title="Panel de transmisiones destacadas"
          description="Ultimos directos y emisiones del canal oficial de Deibis en YouTube."
        />
        <div className="streams-grid">
          {topStreams.map((stream) => (
            <article key={stream.id} className="card stream-card">
              <a
                aria-label={`Abrir stream: ${stream.title}`}
                href={stream.url}
                rel="noreferrer"
                target="_blank"
              >
                <Image
                  alt={stream.title}
                  className="stream-card__image"
                  height={270}
                  src={stream.thumbnail}
                  width={480}
                />
              </a>
              <div className="stream-card__meta">
                <p className="kicker">YouTube Live</p>
                <h3>{stream.title}</h3>
                <a className="button button--secondary" href={stream.url} rel="noreferrer" target="_blank">
                  Abrir Stream
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="hero__actions">
          <a className="button button--secondary" href={youtubeStreamsUrl} rel="noreferrer" target="_blank">
            Ver galeria completa de streams
          </a>
        </div>
      </section>

      <section className="shell content-block">
        <SectionHeading
          eyebrow="Redes"
          title="Sigue la señal en plataformas sociales"
          description="Canales oficiales para contenido, clips y anuncios."
        />
        <div className="social-strip card">
          {socialLinks.map((item) => (
            <a key={item.href} href={item.href} rel="noreferrer" target="_blank">
              {item.label}
            </a>
          ))}
        </div>
      </section>

      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        type="application/ld+json"
      />
    </>
  );
}
