import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matte.pics",
  description: "Give your photos that gallery quality aesthetic",
  manifest: "/manifest.json",
  themeColor: "#301934",
  icons: [
    {
      rel: "icon",
      url: "/favicon.png",
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "152x152",
      url: "/apple-touch-icon@152.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon@180.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "167x167",
      url: "/apple-touch-icon@167.png",
    },
  ],
  appleWebApp: true,
  openGraph: {
    title: "Matte.pics",
    description: "Give your photos that gallery quality aesthetic",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-white bg-gray-200 antialiased text-[17px] leading-[1.47059] tracking-[-0.022em]">
        {children}
      </body>
    </html>
  );
}
