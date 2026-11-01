export type Suit = "Wands" | "Cups" | "Swords" | "Pentacles";
export type Card = { id: string; name: string; arcana: "major" | "minor"; suit?: Suit; number: number;
  element: string; astrology: string; keywords: string[]; upright: string; reversed: string };

const M: [string, string, string, string[], string, string][] = [
 ["The Fool","Air","Uranus",["beginnings","faith","spontaneity"],"A leap into the new with an open heart; trust the journey.","Recklessness or hesitation; look before you leap."],
 ["The Magician","Air","Mercury",["will","skill","manifestation"],"You hold every tool you need; focus your intent and act.","Scattered energy, manipulation or untapped talent."],
 ["The High Priestess","Water","Moon",["intuition","mystery","inner voice"],"Be still and listen; hidden knowledge rises from within.","Ignoring intuition; secrets kept from yourself."],
 ["The Empress","Earth","Venus",["abundance","nurture","fertility"],"Creativity and comfort flourish; tend what you love.","Smothering, neglect of self-care or creative block."],
 ["The Emperor","Fire","Aries",["structure","authority","stability"],"Build firm foundations and lead with steady order.","Rigidity, control or a lack of discipline."],
 ["The Hierophant","Earth","Taurus",["tradition","teaching","ritual"],"Wisdom in lineage, ritual and trusted teachers.","Breaking convention; questioning dogma."],
 ["The Lovers","Air","Gemini",["union","choice","values"],"A meaningful bond or a choice aligned with your values.","Disharmony, misalignment or avoiding a choice."],
 ["The Chariot","Water","Cancer",["willpower","victory","direction"],"Harness opposing forces and drive forward.","Loss of direction or forcing outcomes."],
 ["Strength","Fire","Leo",["courage","compassion","patience"],"Gentle strength tames what fear cannot.","Self-doubt, raw impulse or depleted energy."],
 ["The Hermit","Earth","Virgo",["solitude","reflection","guidance"],"Withdraw to find your inner lantern.","Isolation, loneliness or refusing counsel."],
 ["Wheel of Fortune","Fire","Jupiter",["cycles","fate","turning point"],"The wheel turns in your favour; embrace change.","Resisting change or a run of bad luck."],
 ["Justice","Air","Libra",["truth","fairness","cause and effect"],"Truth and balance prevail; act with integrity.","Unfairness, dishonesty or avoiding accountability."],
 ["The Hanged Man","Water","Neptune",["surrender","pause","new perspective"],"Pause and see from a new angle.","Stalling, martyrdom or resisting release."],
 ["Death","Water","Scorpio",["endings","transformation","release"],"An ending clears space for rebirth.","Clinging to what must end."],
 ["Temperance","Fire","Sagittarius",["balance","moderation","alchemy"],"Blend opposites patiently; healing through moderation.","Excess, imbalance or impatience."],
 ["The Devil","Earth","Capricorn",["attachment","shadow","temptation"],"Name the chains you hold; awareness frees you.","Breaking free, reclaiming power."],
 ["The Tower","Fire","Mars",["upheaval","revelation","awakening"],"Sudden change topples false structures.","Avoiding disaster or fearing necessary change."],
 ["The Star","Air","Aquarius",["hope","renewal","inspiration"],"Healing hope after the storm; trust the light.","Discouragement or disconnection from faith."],
 ["The Moon","Water","Pisces",["illusion","dreams","the unconscious"],"Walk carefully through uncertainty; trust instinct.","Fears lifting, confusion clearing."],
 ["The Sun","Fire","Sun",["joy","success","vitality"],"Warmth, clarity and well-earned joy.","Temporary clouds or dimmed enthusiasm."],
 ["Judgement","Fire","Pluto",["awakening","calling","absolution"],"Answer your calling; rise renewed.","Self-judgement or ignoring the call."],
 ["The World","Earth","Saturn",["completion","wholeness","travel"],"A cycle completes in fulfilment.","Loose ends; seeking closure."],
];
const SUIT: Record<Suit, { element: string; theme: string; signs: string }> = {
  Wands: { element: "Fire", theme: "passion, creativity and drive", signs: "Aries, Leo, Sagittarius" },
  Cups: { element: "Water", theme: "emotion, love and intuition", signs: "Cancer, Scorpio, Pisces" },
  Swords: { element: "Air", theme: "thought, truth and conflict", signs: "Gemini, Libra, Aquarius" },
  Pentacles: { element: "Earth", theme: "home, money and the body", signs: "Taurus, Virgo, Capricorn" },
};
const R: [string, string[], string, string][] = [
 ["Ace",["seed","potential","gift"],"A fresh seed of","Blocked or delayed beginnings in"],
 ["Two",["choice","partnership","balance"],"A choice or partnership shaping","Indecision or imbalance in"],
 ["Three",["growth","collaboration","expansion"],"Early growth and shared effort in","Setbacks or poor teamwork in"],
 ["Four",["stability","rest","foundation"],"Stability and rest around","Stagnation or restlessness in"],
 ["Five",["challenge","loss","conflict"],"Struggle that tests your","Recovery from struggle in"],
 ["Six",["harmony","generosity","progress"],"Harmony and progress in","Old patterns or imbalance in"],
 ["Seven",["assessment","perseverance","strategy"],"Reassessing and persevering with","Doubt or scattered effort in"],
 ["Eight",["movement","mastery","change"],"Swift movement and skill in","Stuck energy or frustration in"],
 ["Nine",["near-completion","resilience","fulfilment"],"Near-fulfilment and resilience in","Anxiety or overwhelm in"],
 ["Ten",["culmination","burden","legacy"],"The culmination of","Burnout or release in"],
 ["Page",["curiosity","message","student"],"A curious message about","Immaturity or poor news in"],
 ["Knight",["action","pursuit","quest"],"Bold pursuit of","Haste or stalled pursuit of"],
 ["Queen",["nurture","mastery","inner power"],"Mature, nurturing mastery of","Insecurity or coldness in"],
 ["King",["authority","leadership","command"],"Steady leadership over","Misused authority over"],
];
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const CARDS: Card[] = [
  ...M.map(([name, element, astrology, keywords, upright, reversed], i) => ({ id: slug(name), name, arcana: "major" as const, number: i, element, astrology, keywords, upright, reversed })),
  ...(Object.keys(SUIT) as Suit[]).flatMap((suit) => R.map(([rank, keywords, u, r], i) => {
    const s = SUIT[suit]; const name = `${rank} of ${suit}`;
    return { id: slug(name), name, arcana: "minor" as const, suit, number: i + 1, element: s.element, astrology: s.signs, keywords,
      upright: `${u} ${s.theme}.`, reversed: `${r} ${s.theme}.` };
  })),
];
