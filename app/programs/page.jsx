import SiteShell from "../components/SiteShell";
import { ProgramsPage } from "../components/Pages";

export const metadata = {
  title: "Programs | The Academy Toronto",
  description:
    "Brazilian Jiu Jitsu, Kickboxing, Wrestling, Judo, Adult Gymnastics, and Youth BJJ/Judo in Toronto.",
};

export default function Programs() {
  return (
    <SiteShell>
      <ProgramsPage />
    </SiteShell>
  );
}
