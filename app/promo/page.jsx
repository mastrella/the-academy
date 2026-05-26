import SiteShell from "../components/SiteShell";
import { PromoPage } from "../components/Pages";

export const metadata = {
  title: "Promo | The Academy Toronto",
  description: "The Academy Toronto promotional trial offer.",
};

export default function Promo() {
  return (
    <SiteShell>
      <PromoPage />
    </SiteShell>
  );
}
