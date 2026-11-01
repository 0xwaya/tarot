export const SPREADS = {
  daily: { name: "Daily Card", positions: ["Your card for today"] },
  three: { name: "Past · Present · Future", positions: ["Past", "Present", "Future"] },
  celtic: { name: "Celtic Cross", positions: ["Present", "Challenge", "Foundation", "Recent past", "Crown / potential", "Near future", "Self", "Environment", "Hopes & fears", "Outcome"] },
  protection: { name: "Protection Spread", positions: ["What threatens your peace", "Your shield", "What to release / cleanse", "Ally energy to call in", "Blessing going forward"] },
} as const;
export type SpreadKey = keyof typeof SPREADS;
