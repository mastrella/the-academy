import SiteShell from "../components/SiteShell";
import { PrivacyPolicyPage } from "../components/Pages";

export const metadata = {
  title: "Privacy Policy | The Academy Toronto",
  description: "The Academy Toronto privacy policy.",
};

export default function PrivacyPolicy() {
  return (
    <SiteShell>
      <PrivacyPolicyPage />
    </SiteShell>
  );
}
