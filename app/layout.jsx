import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.theacademytoronto.ca"),
  title: {
    default: "The Academy Toronto",
    template: "%s",
  },
  description:
    "The Academy Toronto offers Brazilian Jiu Jitsu, Judo, Sanda kickboxing, Wrestling, Adult Gymnastics, Youth BJJ/Judo, private instruction, and free trial classes at 33 Davisville Ave.",
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
