import "./globals.css";

import { Cutive, Old_Standard_TT, Press_Start_2P } from "next/font/google";

import { ApolloWrapper } from "../lib/ApolloWrapper";
import type { Metadata } from "next";
import { Session } from "next-auth";
import SessionProvider from "@/lib/SessionProvider";
import { cutive } from "@/lib/cutive";
import { getSession } from "next-auth/react";

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
    <html lang="en" className={`${cutive.className} antialiased`}>
      <body className="w-screen">
        <SessionProvider session={session}>
          <ApolloWrapper>{children}</ApolloWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
