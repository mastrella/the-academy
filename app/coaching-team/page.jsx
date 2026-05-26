import SiteShell from "../components/SiteShell";
import { CoachingTeamPage } from "../components/Pages";

export const metadata = {
  title: "Coaching Team | The Academy Toronto",
  description: "Meet The Academy Toronto coaching team.",
};

export default function CoachingTeam() {
  return (
    <SiteShell>
      <CoachingTeamPage />
    </SiteShell>
  );
}
