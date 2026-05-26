import "./globals.css";
import { site } from "./data/site";

export const metadata = {
  metadataBase: new URL("https://www.theacademytoronto.ca"),
  title: {
    default: "The Academy Toronto",
    template: "%s",
  },
  description:
    "The Academy Toronto offers Brazilian Jiu Jitsu, Judo, Sanda kickboxing, Wrestling, Adult Gymnastics, Youth BJJ/Judo, private instruction, and free trial classes at 33 Davisville Ave.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Academy Toronto",
    description:
      "Martial arts training in Toronto at 33 Davisville Ave: BJJ, Judo, Kickboxing, Wrestling, Adult Gymnastics, Youth programs, and private instruction.",
    url: "https://www.theacademytoronto.ca",
    siteName: "The Academy Toronto",
    images: [
      {
        url: "https://images.squarespace-cdn.com/content/v1/5983b46a9f745676d8a80d18/1502841416680-W96YCA3URDY1FN5LQ5QX/The+Academy+Crest+%28Final%29+.jpg",
        width: 1500,
        height: 1466,
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Academy Toronto",
    description:
      "Martial arts training in Toronto: BJJ, Judo, Kickboxing, Wrestling, youth programs, private instruction, and free trial classes.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["SportsActivityLocation", "LocalBusiness"],
    name: site.name,
    url: "https://www.theacademytoronto.ca",
    image: site.crest,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "33 Davisville Ave",
      addressLocality: "Toronto",
      addressRegion: "ON",
      postalCode: "M4S 2Y9",
      addressCountry: "CA",
    },
    sameAs: [site.instagram, site.facebook],
    areaServed: ["Toronto", "Midtown Toronto", "Davisville", "Yonge and Eglinton"],
    sport: [
      "Brazilian Jiu Jitsu",
      "Judo",
      "Kickboxing",
      "Wrestling",
      "Adult Gymnastics",
    ],
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
