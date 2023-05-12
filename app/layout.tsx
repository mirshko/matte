import { Metadata } from "next";
import "../styles/app.css";

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
      <body>
        <div className="top-left z-max">
          <a
            href="https://reiner.systems"
            rel="noopener"
            target="_blank"
            className="wrapper"
          >
            <svg width={45} height={45} viewBox="0 0 45 45" fill="none">
              <title>Matte.pics</title>
              <rect width={45} height={45} rx={11.25} fill={"#fff"} />
              <path
                fill="var(--primary)"
                d="M10.195 10.195h24.609v24.609H10.195z"
              />
            </svg>
          </a>
        </div>

        {children}
      </body>
    </html>
  );
}
