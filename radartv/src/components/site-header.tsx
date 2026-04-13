import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/elradartv', label: 'En Vivo' },
  { href: '/deibisromero', label: 'Perfil' },
  { href: '/epk', label: 'EPK' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link className="site-header__brand" href="/">
          <span>El Radar TV</span>
          <small>Portal Oficial</small>
        </Link>
        <nav className="site-header__nav" aria-label="Navegacion principal">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
