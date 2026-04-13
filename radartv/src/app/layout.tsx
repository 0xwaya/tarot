import type { Metadata } from 'next';
import { Cormorant_Garamond, Space_Grotesk } from 'next/font/google';

import { GlobalPlayer } from '@/components/player/global-player';
import { PlayerProvider } from '@/components/player/player-provider';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { WhatsAppWidget } from '@/components/whatsapp-widget';
import { siteUrl } from '@/content/site';

import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
});

const body = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'El Radar TV | Portal Oficial',
  description:
    'Portal oficial de Deibis Romero en Chile, priorizando TV y radio en vivo con contacto rapido.',
  openGraph: {
    title: 'El Radar TV | Portal Oficial',
    description:
      'Portal oficial de Deibis Romero en Chile, priorizando TV y radio en vivo con contacto rapido.',
    url: siteUrl,
    siteName: 'El Radar TV',
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Radar TV | Portal Oficial',
    description:
      'Portal oficial de Deibis Romero en Chile, priorizando TV y radio en vivo con contacto rapido.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${display.variable} ${body.variable}`} lang="es">
      <body>
        <PlayerProvider>
          <div className="page-frame">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
            <WhatsAppWidget />
            <GlobalPlayer />
          </div>
        </PlayerProvider>
      </body>
    </html>
  );
}
