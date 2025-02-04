import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.SITE_TITLE}`,
    default: process.env.SITE_TITLE,
  },
  description: "Shingo Sato's blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="root">
          <header className="header">
            <nav className="nav">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
            </nav>
          </header>
          <main className="main">{children}</main>
          <footer className="footer">aaaaaaaaaa</footer>
        </div>
      </body>
    </html>
  );
}
