import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  viewport: {
    width: "device-width",
    initialScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  title: "Matte.pics",
  description: "Give your photos that gallery quality aesthetic",
  themeColor: "#e5e7eb",
  metadataBase: new URL("https://matte.pics"),
  manifest: new URL("https://matte.pics/site.webmanifest"),
  icons: [],
  twitter: {
    title: "Matte.pics",
    description: "Give your photos that gallery quality aesthetic",
    card: "summary",
  },
  appleWebApp: {
    title: "Matte.pics",
    capable: true,
    statusBarStyle: "black",
  },
  openGraph: {
    title: "Matte.pics",
    description: "Give your photos that gallery quality aesthetic",
    url: new URL("https://matte.pics"),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="text-white bg-gray-200 antialiased text-[17px] leading-[1.47059] tracking-[-0.022em] grid place-items-center min-h-screen h-full"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
