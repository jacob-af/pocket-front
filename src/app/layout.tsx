import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/app/Apollo/SessionProvider";
import { getSession } from "next-auth/react";
import { ApolloWrapper } from "./Apollo/ApolloWrapper";

import { Session } from "next-auth";

const pressStart = Press_Start_2P({ subsets: ["latin"], weight: "400" });

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
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </head>
      <body className={`${pressStart.className} antialiased`}>
        <SessionProvider session={session}>
          <ApolloWrapper>{children}</ApolloWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
