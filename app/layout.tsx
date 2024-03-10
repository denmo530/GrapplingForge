import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import SupabaseProvider from "@/components/providers/supabase-provider";
import UserProvider from "@/components/providers/userProvider";
import ModalProvider from "@/components/providers/ModalProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
});

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
    <html lang="en" className={inter.className}>
      <body>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            {children}
            <Toaster />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
