import SiteShell from "../components/SiteShell";
import { FreeTrialPage } from "../components/Pages";

export const metadata = {
  title: "Free Trial | The Academy Toronto",
  description: "Claim a free trial class at The Academy Toronto.",
};

export default function FreeTrial() {
  return (
    <SiteShell>
      <FreeTrialPage />
    </SiteShell>
  );
}
