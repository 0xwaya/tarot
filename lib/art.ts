// Card ids with generated artwork in public/cards/*.webp; others fall back to SVG faces.
export const CARD_ART = new Set<string>(["death", "judgement", "justice", "strength", "temperance", "the-chariot", "the-devil", "the-emperor", "the-empress", "the-fool", "the-hanged-man", "the-hermit", "the-hierophant", "the-high-priestess", "the-lovers", "the-magician", "the-moon", "the-star", "the-sun", "the-tower", "the-world", "wheel-of-fortune"]);
export const hasArt = (id: string) => CARD_ART.has(id);
