type RadarVectorProps = {
  className?: string;
};

export function RadarVector({ className }: RadarVectorProps) {
  return (
    <div className={className} aria-hidden="true">
      <svg className="radar-vector" viewBox="0 0 520 520" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(114,212,232,0.45)" />
            <stop offset="48%" stopColor="rgba(114,212,232,0.08)" />
            <stop offset="100%" stopColor="rgba(7,17,31,0)" />
          </radialGradient>
          <linearGradient id="sweepCore" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(114,212,232,0.9)" />
            <stop offset="65%" stopColor="rgba(114,212,232,0.24)" />
            <stop offset="100%" stopColor="rgba(114,212,232,0)" />
          </linearGradient>
        </defs>

        <circle cx="260" cy="260" fill="url(#radarGlow)" r="252" />

        <circle className="radar-vector__ring radar-vector__ring--outer" cx="260" cy="260" r="226" />
        <circle className="radar-vector__ring" cx="260" cy="260" r="170" />
        <circle className="radar-vector__ring" cx="260" cy="260" r="116" />
        <circle className="radar-vector__ring" cx="260" cy="260" r="62" />

        <line className="radar-vector__axis" x1="260" x2="260" y1="18" y2="502" />
        <line className="radar-vector__axis" x1="18" x2="502" y1="260" y2="260" />

        <g className="radar-vector__sweep-wrap">
          <path className="radar-vector__sweep" d="M260 260 L260 16 A244 244 0 0 1 478 164 Z" />
          <line className="radar-vector__beam" x1="260" x2="468" y1="260" y2="168" />
        </g>

        <g className="radar-vector__blips">
          <circle className="radar-vector__blip radar-vector__blip--1" cx="348" cy="198" r="5" />
          <circle className="radar-vector__blip radar-vector__blip--2" cx="204" cy="300" r="4" />
          <circle className="radar-vector__blip radar-vector__blip--3" cx="398" cy="322" r="6" />
          <circle className="radar-vector__blip radar-vector__blip--4" cx="266" cy="136" r="4" />
        </g>

        <circle className="radar-vector__center" cx="260" cy="260" r="9" />
      </svg>
    </div>
  );
}
