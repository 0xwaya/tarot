// Placeholder listings — prices/photos TBD. Stripe checkout not wired yet.
export type Product = { id: string; name: string; category: string; price: number; blurb: string; hue: string; glyph: string };
export const PRODUCTS: Product[] = [
 { id:"amethyst-charm-necklace", name:"Amethyst Charm Necklace", category:"Charm Necklaces", price:48, blurb:"Raw amethyst point with silver moon charm for calm and intuition.", hue:"#9b6bd6", glyph:"☾" },
 { id:"rose-quartz-charm-necklace", name:"Rose Quartz Charm Necklace", category:"Charm Necklaces", price:44, blurb:"Rose quartz heart for self-love and gentle healing.", hue:"#e8a0b8", glyph:"♡" },
 { id:"key-charm-necklace", name:"Skeleton Key Charm Necklace", category:"Charm Necklaces", price:42, blurb:"Antique-silver key to open new doors.", hue:"#c0c4d0", glyph:"⚷" },
 { id:"shell-charm-necklace", name:"Sea Shell Charm Necklace", category:"Charm Necklaces", price:38, blurb:"Ocean shell for cleansing tides and water energy.", hue:"#e9d8c0", glyph:"🐚" },
 { id:"protection-amulet", name:"Witch's Protection Amulet", category:"Amulets", price:55, blurb:"Black tourmaline & pentacle amulet, blessed under the full moon.", hue:"#4a3a5a", glyph:"⛤" },
 { id:"evil-eye-amulet", name:"Evil Eye Amulet", category:"Amulets", price:32, blurb:"Classic nazar to turn away envy and ill wishes.", hue:"#4a78c8", glyph:"◉" },
 { id:"cleansing-potion", name:"Moonwater Cleansing Potion", category:"Potions", price:24, blurb:"Rosemary, sage and moon water mist to clear stale energy.", hue:"#7fb7a8", glyph:"⚗" },
 { id:"blessing-oil", name:"Abundance Blessing Oil", category:"Potions", price:28, blurb:"Cinnamon, basil and citrine-infused anointing oil.", hue:"#d9a441", glyph:"✦" },
 { id:"palo-santo-bundle", name:"Palo Santo Bundle (6 sticks)", category:"Palo Santo & Cleansing", price:16, blurb:"Sustainably sourced holy wood for clearing and blessing.", hue:"#b98a5a", glyph:"🜂" },
 { id:"cleansing-kit", name:"Home Cleansing Kit", category:"Palo Santo & Cleansing", price:39, blurb:"Palo santo, salt, selenite and a guided ritual card.", hue:"#e6e1f5", glyph:"✧" },
];
