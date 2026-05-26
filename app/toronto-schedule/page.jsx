import SiteShell from "../components/SiteShell";
import { SchedulePage } from "../components/Pages";

export const metadata = {
  title: "Schedule - Academy Toronto | The Academy Toronto",
  description: "Current class schedule for The Academy Toronto at 33 Davisville Ave.",
};

export default function TorontoSchedule() {
  return (
    <SiteShell>
      <SchedulePage />
    </SiteShell>
  );
}
