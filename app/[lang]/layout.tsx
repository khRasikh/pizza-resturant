import "./globals.css";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

import { i18n } from "../../i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2560444930658861"
          crossOrigin="anonymous"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
