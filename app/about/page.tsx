export const metadata = { title: "About tarot", description: "Where tarot, astrology and modern witchcraft actually come from: a short, sourced history." };
const S = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <section className="rounded-2xl bg-plum/50 border border-silver/15 p-5 sm:p-6 fade-up"><h2 className="font-serif text-xl sm:text-2xl text-candle mb-2">{t}</h2><div className="text-silver/90 leading-relaxed space-y-3">{children}</div></section>);
export default function Page() {
  return (<div className="max-w-3xl mx-auto space-y-6">
    <h1 className="font-serif text-3xl sm:text-4xl text-center glow">About tarot</h1>
    <p className="text-center text-silver">A short history of the cards and the craft, told the way historians tell it.</p>
    <S t="A card game from Renaissance Italy">
      <p>Tarot began in 15th-century northern Italy as a card game called <em>trionfi</em>, later <em>tarocchi</em>. The oldest surviving decks are hand-painted luxury sets, such as the Visconti-Sforza cards from the mid-1400s.</p>
      <p>Using tarot for divination is documented from the 18th century onward.</p>
    </S>
    <S t="The legend of ancient origins">
      <p>In 1781 Antoine Court de Gébelin claimed the cards held the wisdom of ancient Egypt. Later French occultists such as Etteilla, Éliphas Lévi and Papus added Kabbalistic and &ldquo;Bohemian&rdquo; origin stories.</p>
      <p>Historians, led by Michael Dummett, have shown these claims have no historical basis. We treat them as part of tarot&rsquo;s colorful legend, not as its history.</p>
    </S>
    <S t="The Golden Dawn and the modern deck">
      <p>The Hermetic Order of the Golden Dawn (founded 1888) systematized the links between tarot, astrology and the Hebrew letters in its <em>Book T</em>. Arthur Edward Waite and Pamela Colman Smith&rsquo;s 1909 deck made fully illustrated minor arcana the modern norm.</p>
      <p>Occult systems map the letters differently: Lévi and Papus differ from the Golden Dawn, and Aleister Crowley swaps Heh and Tzaddi. The correspondences on this site follow <em>Book T</em>.</p>
    </S>
    <S t="Witchcraft and folk magic">
      <p>Modern Paganism and Wicca are 20th-century revivals. Ronald Hutton&rsquo;s <em>The Triumph of the Moon</em> (1999), the standard academic history, shows they draw on folk magic, ceremonial magic and Romanticism rather than an unbroken ancient line.</p>
      <p>Britain&rsquo;s &ldquo;cunning folk&rdquo; were real folk-magic practitioners who offered protection charms and remedies, and our protection and blessing pieces are made in that spirit.</p>
    </S>
    <S t="Astrology">
      <p>The traditional planetary rulers of the signs follow Ptolemy&rsquo;s <em>Tetrabiblos</em> (2nd century). William Lilly&rsquo;s <em>Christian Astrology</em> (1647) preserves that framework. The modern co-rulers (Uranus, Neptune and Pluto) were added in the 19th and 20th centuries.</p>
    </S>
    <p className="text-xs text-silver/60 text-center">Card meanings are paraphrased from Waite (1910) and Golden Dawn <em>Book T</em>. Readings and horoscopes are for spiritual and entertainment purposes only.</p>
  </div>);
}
