export const SIGNS = [
 ["aries","Aries","♈","Mar 21 – Apr 19","Fire","Mars"],["taurus","Taurus","♉","Apr 20 – May 20","Earth","Venus"],
 ["gemini","Gemini","♊","May 21 – Jun 20","Air","Mercury"],["cancer","Cancer","♋","Jun 21 – Jul 22","Water","Moon"],
 ["leo","Leo","♌","Jul 23 – Aug 22","Fire","Sun"],["virgo","Virgo","♍","Aug 23 – Sep 22","Earth","Mercury"],
 ["libra","Libra","♎","Sep 23 – Oct 22","Air","Venus"],["scorpio","Scorpio","♏","Oct 23 – Nov 21","Water","Pluto"],
 ["sagittarius","Sagittarius","♐","Nov 22 – Dec 21","Fire","Jupiter"],["capricorn","Capricorn","♑","Dec 22 – Jan 19","Earth","Saturn"],
 ["aquarius","Aquarius","♒","Jan 20 – Feb 18","Air","Uranus"],["pisces","Pisces","♓","Feb 19 – Mar 20","Water","Neptune"],
].map(([slug, name, glyph, dates, element, ruler]) => ({ slug, name, glyph, dates, element, ruler }));
