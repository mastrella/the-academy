import SiteShell from "../components/SiteShell";
import { ContactPage } from "../components/Pages";

export const metadata = {
  title: "Contact | The Academy Toronto",
  description: "Contact The Academy Toronto at 33 Davisville Ave.",
};

export default function Contact() {
  return (
    <SiteShell>
      <ContactPage />
    </SiteShell>
  );
}
