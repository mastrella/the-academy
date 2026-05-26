import SiteShell from "../components/SiteShell";
import { PrivateInstructionPage } from "../components/Pages";

export const metadata = {
  title: "Private Instruction | The Academy Toronto",
  description: "Private and semi-private martial arts instruction at The Academy Toronto.",
};

export default function PrivateInstruction() {
  return (
    <SiteShell>
      <PrivateInstructionPage />
    </SiteShell>
  );
}
