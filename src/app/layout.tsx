import "./globals.css";

import { ApolloWrapper } from "../lib/ApolloWrapper";
import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import { Session } from "next-auth";
import SessionProvider from "@/lib/SessionProvider";
import { getSession } from "next-auth/react";

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Pocket",
  description: "Pocket Bar Book"
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session: Session | null = await getSession();

  return (
    <html lang="en" className={`${pressStart.className} antialiased`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#042940" />
      </head>
      <body>
        <SessionProvider session={session}>
          <ApolloWrapper>{children}</ApolloWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
