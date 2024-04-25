import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/app/Apollo/SessionProvider";
import { getSession } from "next-auth/react";
import { ApolloWrapper } from "./Apollo/ApolloWrapper";

import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pocket",
  description: "Pocket Bar Book"
};

//type Session = Omit<DefaultSession, "expires">;

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session: Session | null = await getSession();

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <ApolloWrapper>{children}</ApolloWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
