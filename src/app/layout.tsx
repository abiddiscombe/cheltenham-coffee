import "./globals.css";
import type { Metadata, Viewport } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Header from "./_Header";

export const metadata: Metadata = {
  title: "Cheltenham Coffee",
  description:
    "A web map of coffee shops in Cheltenham (United Kingdom) with support for location filtering.",
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#ffffff" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NuqsAdapter>
      <html lang="en">
        <body className="bg-primary-50 h-dvh grid grid-rows-[auto_1fr]">
          <Header />
          <main>{children}</main>
        </body>
      </html>
    </NuqsAdapter>
  );
}
