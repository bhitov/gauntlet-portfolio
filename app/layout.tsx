import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gauntlet AI Portfolio",
  description: "Portfolio of AI and machine learning projects from Gauntlet AI bootcamp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}