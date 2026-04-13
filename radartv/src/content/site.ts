export type Track = {
  id: string;
  title: string;
  subtitle: string;
  url?: string;
  kind: 'live' | 'clip';
  externalUrl?: string;
};

export const siteUrl = 'https://radartv.vercel.app';

const configuredWhatsAppNumber = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '56991248558'
).replace(/\D/g, '');

export const youtubeStreamsUrl = 'https://www.youtube.com/@deibisromerolocutor/streams';

export const whatsappContact = {
  number: configuredWhatsAppNumber,
  message: 'Hola Deibis, te escribo desde el portal para consultar por una colaboracion.',
};

export const whatsappLink = configuredWhatsAppNumber
  ? `https://wa.me/${configuredWhatsAppNumber}?text=${encodeURIComponent(whatsappContact.message)}`
  : `mailto:producciones@deibisromero.com?subject=${encodeURIComponent('Contacto desde portal')}`;

export const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/deibisromero',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/deibis.romero.3',
  },
  {
    label: 'X',
    href: 'https://twitter.com/deibisromero?ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline%7Ctwterm%5Escreen-name%3Adeibisromero%7Ctwcon%5Es1_c1',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@deibisromerolocutor/featured',
  },
];

export const liveTrack: Track = {
  id: 'deibis-live-radio',
  title: 'El Radar Radio En Vivo',
  subtitle: 'Musica 24/7, actualidad y la identidad en vivo de Deibis Romero',
  url: 'https://acp2.lorini.net:27050/stream',
  kind: 'live',
  externalUrl: 'http://player.lorini.net/drtv',
};

export const watchLiveUrl = 'https://video.ipstream.cl:3459/hybrid/play.m3u8';

export const clipTracks: Track[] = [
  {
    id: 'voice-reel',
    title: 'Demo de Voz',
    subtitle: 'La fuente actual es la galeria publica; faltan exportaciones directas.',
    kind: 'clip',
    externalUrl: 'https://deibisromero.com/sonidos.html',
  },
  {
    id: 'station-id',
    title: 'IDs de Estacion',
    subtitle: 'Placeholder de presentacion basado en la galeria existente.',
    kind: 'clip',
    externalUrl: 'https://elradartv.cl/sonidos.html',
  },
  {
    id: 'youtube-clips',
    title: 'Clips Destacados',
    subtitle: 'Tomados del canal de YouTube mientras se exporta la libreria propia.',
    kind: 'clip',
    externalUrl: 'https://www.youtube.com/@deibisromerolocutor/featured',
  },
];

export const brandSummary = {
  headline: 'Marca personal y medio en vivo en una sola experiencia clara.',
  body: 'Este portal prioriza En Vivo TV y Radio para audiencia en Chile, con acceso directo a contacto y contenido social sin friccion.',
};

export const deibisProfile = {
  name: 'Deibis Romero',
  role: 'Locutor, presentador, productor y fundador',
  image: 'https://deibisromero.com/images/deibis.webp',
  email: 'producciones@deibisromero.com',
  location: 'Concepcion, Chile',
  intro: 'Comunicador con trayectoria en radio, television y produccion digital, hoy enfocado en transmision en vivo y colaboraciones de marca.',
  stats: [
    { label: 'Enfoque', value: 'Radio + TV + Voz' },
    { label: 'Base Actual', value: 'Chile' },
    { label: 'Canal Principal', value: 'En Vivo + WhatsApp' },
  ],
};

export const bioTimeline = [
  {
    year: 'Early career',
    text: 'Started in community media in Antimano with announcing, production, promotions, and news narration while also supporting television production.',
  },
  {
    year: '2008-2014',
    text: 'Worked across education, acting, local radio, technical operations, and traffic reporting while strengthening voice and presentation work.',
  },
  {
    year: '2017-2020',
    text: 'Expanded into broader radio reporting, social impact initiatives, and digital educational content distributed across multiple platforms.',
  },
  {
    year: '2021-2022',
    text: 'Brought El Radar to Chile, built local collaborations, and launched an online radio identity under his own name and app presence.',
  },
  {
    year: 'Today',
    text: 'Operates a continuous music and information stream, voice branding work, and a growing cross-platform media presence around El Radar TV and Deibis Romero.',
  },
];

export const serviceCards = [
  {
    title: 'Voice and Presentation',
    text: 'Commercial voice, station imaging, live presentation, and brand-safe spoken delivery for events and media partners.',
  },
  {
    title: 'Broadcast Collaborations',
    text: 'Interviews, featured segments, guest appearances, and live coverage modules across radio and digital formats.',
  },
  {
    title: 'Brand Partnerships',
    text: 'Campaigns and sponsored integrations designed around trusted on-air identity and community reach.',
  },
];

export const radarProgramming = [
  {
    title: 'Live Stream',
    text: 'Always-on radio experience with music flow, personality, and direct audience familiarity.',
  },
  {
    title: 'Interview Format',
    text: 'Expandable slot for artist conversations, cultural coverage, and local media storytelling.',
  },
  {
    title: 'Clip Publishing',
    text: 'Reusable short-form content for reels, site updates, and channel distribution after launch.',
  },
];

export const ctaBlocks = {
  booking: {
    title: 'Reserva a Deibis para locucion, conduccion o colaboraciones',
    body: 'Canal directo para consultas comerciales, eventos y alianzas.',
    href: 'mailto:producciones@deibisromero.com?subject=Consulta%20Comercial',
    label: 'Enviar Consulta',
  },
  epk: {
    title: 'Abrir experiencia EPK digital',
    body: 'Presentacion de prensa y activos de marca en formato simple para enviar rapido.',
    href: '/epk',
    label: 'Ver EPK',
  },
  stream: {
    title: 'Acceso en vivo como prioridad del portal',
    body: 'TV y radio en un toque, especialmente para trafico movil en Chile.',
    href: watchLiveUrl,
    label: 'Ver TV En Vivo',
  },
};
