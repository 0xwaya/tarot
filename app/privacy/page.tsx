import { SITE } from "@/lib/site";
export const metadata = { title: "Privacy Policy" };
export default function Page() { return (<article className="max-w-2xl mx-auto space-y-4 text-silver">
  <h1 className="font-serif text-3xl sm:text-4xl text-candle">Privacy Policy</h1>
  <p>{SITE.name} collects as little as possible. Readings are drawn in your browser and are not stored at this stage.</p>
  <p>When accounts and the shop launch, we will store only what is needed to deliver your readings and orders (name, email, shipping address). Payments will be handled by a third-party processor; we never see your full card number.</p>
  <p>We do not sell personal data. Contact details will be published before launch.</p>
  <p className="text-xs">Draft — to be reviewed before going public.</p></article>); }
