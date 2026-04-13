import { deibisProfile, siteUrl } from '@/content/site';

export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: deibisProfile.name,
    jobTitle: deibisProfile.role,
    email: deibisProfile.email,
    image: deibisProfile.image,
    url: `${siteUrl}/deibisromero`,
    sameAs: [
      'https://www.instagram.com/deibisromero',
      'https://www.facebook.com/deibis.romero.3',
      'https://www.youtube.com/@deibisromerolocutor/featured',
      'https://elradartv.cl',
      'https://deibisromero.com',
    ],
  };
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'El Radar TV',
    url: `${siteUrl}/elradartv`,
    logo: 'https://elradartv.cl/images/logo.webp',
    sameAs: [
      'https://elradartv.cl',
      'https://deibisromero.com',
      'https://www.instagram.com/deibisromero',
      'https://www.youtube.com/@deibisromerolocutor/featured',
    ],
  };
}

export function buildBroadcastSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BroadcastEvent',
    name: 'El Radar Radio Live',
    isLiveBroadcast: true,
    startDate: '2022-03-01T00:00:00-04:00',
    url: `${siteUrl}/elradartv`,
    publishedOn: {
      '@type': 'BroadcastService',
      name: 'El Radar Radio',
    },
  };
}
