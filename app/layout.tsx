import { Inter } from "next/font/google";

import { cx } from "@/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={cx(inter.className, "bg-[#FEFDF9]")}>{children}</body>
    </html>
  );
}
