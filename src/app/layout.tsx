import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cheltenham Coffee Map",
  description: "Cheltenham Coffee Map",
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
