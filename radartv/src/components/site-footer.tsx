import Link from 'next/link';

import { socialLinks } from '@/content/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div>
          <p className="site-footer__title">Portal oficial para Chile</p>
          <p>
            TV y radio en vivo con acceso directo a contacto, colaboraciones y canales sociales.
          </p>
        </div>
        <div>
          <p className="site-footer__title">Navegacion</p>
          <div className="site-footer__links">
            <Link href="/">Inicio</Link>
            <Link href="/elradartv">En Vivo</Link>
            <Link href="/deibisromero">Perfil</Link>
            <Link href="/epk">EPK</Link>
          </div>
        </div>
        <div>
          <p className="site-footer__title">Redes</p>
          <div className="site-footer__links">
            {socialLinks.map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
