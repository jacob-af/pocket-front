import "./globals.css";

import { Cutive, Old_Standard_TT, Press_Start_2P } from "next/font/google";
import type { Metadata, Viewport } from "next";

import { ApolloWrapper } from "../lib/ApolloWrapper";
import { Session } from "next-auth";
import SessionProvider from "@/lib/SessionProvider";
import { cutive } from "@/lib/cutive";
import { getSession } from "next-auth/react";

const APP_NAME = "Pocket BB";
const APP_DEFAULT_TITLE = "Pocket Bar Book";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Recipe Management for Bartenders";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  }
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF"
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  //const session: Session | null = await getSession();

  return (
    <html lang="en" className={`${cutive.className} antialiased`}>
      <body className="h-screen w-screen overflow-x-hidden">
        <SessionProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
