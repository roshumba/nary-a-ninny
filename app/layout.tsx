import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./ui/nav-bar";

const inter = Inter({
  style: 'normal',
  weight: 'variable',
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nary a Ninny",
  description: "Ask better questions, get faster answers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter} ${inter} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><NavBar /> {children}</body>
    </html>
  );
}
