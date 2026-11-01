// Moon Phases mark: a crescent cradling a full moon inside a ring of phase dots.
export function LogoMark({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f3c26b" /><stop offset="1" stopColor="#c9cbd6" /></linearGradient></defs>
      <circle cx="24" cy="24" r="22" fill="none" stroke="url(#lg)" strokeWidth="1.2" />
      {Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2 - Math.PI / 2; return <circle key={i} cx={24 + 18 * Math.cos(a)} cy={24 + 18 * Math.sin(a)} r={i === 4 ? 2.2 : 1.4} fill={i % 2 ? "#c9cbd6" : "#f3c26b"} opacity={0.85} />; })}
      <path d="M28 12a12 12 0 1 0 0 24a9.5 9.5 0 1 1 0-24z" fill="url(#lg)" />
      <circle cx="27" cy="24" r="4.2" fill="#9b6bd6" opacity=".9" />
    </svg>
  );
}
