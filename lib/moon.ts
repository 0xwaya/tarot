// Approximate current moon phase (synodic month from a known new moon).
const PHASES = [["New Moon","🌑"],["Waxing Crescent","🌒"],["First Quarter","🌓"],["Waxing Gibbous","🌔"],["Full Moon","🌕"],["Waning Gibbous","🌖"],["Last Quarter","🌗"],["Waning Crescent","🌘"]] as const;
export const PHASE_GLYPHS = PHASES.map((p) => p[1]);
export function moonPhase(d = new Date()) {
  const age = (((d.getTime() - Date.UTC(2000, 0, 6, 18, 14)) / 86400000) % 29.530588 + 29.530588) % 29.530588;
  const i = Math.round(age / 29.530588 * 8) % 8;
  return { name: PHASES[i][0], glyph: PHASES[i][1], age: Math.floor(age) };
}
