import "./globals.css";

export const metadata = {
  title: "The Academy MMA Voice AI",
  description:
    "A voice AI receptionist demo for The Academy MMA, built to answer calls, qualify prospects, and capture trial-class leads.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
