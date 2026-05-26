import SiteShell from "../components/SiteShell";
import { LocationPage } from "../components/Pages";

export const metadata = {
  title: "Academy Toronto | The Academy Toronto",
  description: "Visit The Academy Toronto at 33 Davisville Ave near Yonge and Davisville.",
};

export default function AcademyToronto() {
  return (
    <SiteShell>
      <LocationPage />
    </SiteShell>
  );
}
