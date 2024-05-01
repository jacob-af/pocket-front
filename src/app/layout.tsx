import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/lib/SessionProvider";
import { getSession } from "next-auth/react";
import { ApolloWrapper } from "../lib/ApolloWrapper";
import { Session } from "next-auth";

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
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </head>
      <body>
        <SessionProvider session={session} refetchInterval={23 * 60 * 60}>
          <ApolloWrapper>{children}</ApolloWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
