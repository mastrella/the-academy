import SiteShell from "../components/SiteShell";
import { RulesPage } from "../components/Pages";

export const metadata = {
  title: "Safety and Etiquette | The Academy Toronto",
  description: "Academy safety and etiquette requirements for all programs.",
};

export default function Rules() {
  return (
    <SiteShell>
      <RulesPage />
    </SiteShell>
  );
}
