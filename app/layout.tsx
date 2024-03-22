import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import UserProvider from "@/components/providers/userProvider";
import ModalProvider from "@/components/providers/ModalProvider";
import { Toaster } from "@/components/ui/toaster";
import { openSans } from "./fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.png",
      href: "/logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <ModalProvider />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
