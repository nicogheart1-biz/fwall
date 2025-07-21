import { Rubik } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import {
  PermitGuardComponent,
  SessionManagerComponent,
} from "@/components/@core";
import "@/components/@core/skipContent/skip-content.style.css";
import { Metadata } from "next";
import { AppConstants } from "@/src/constants";
import clsx from "clsx";
import { isMocked } from "@/src/utils/envs.utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ClientComponentsWrapper from "@/components/@core/ClientComponentsWrapper/ClientComponentsWrapper";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${AppConstants.title}`,
    default: AppConstants.title,
  },
  description: AppConstants.description,
  openGraph: {
    title: {
      template: `%s | ${AppConstants.title}`,
      default: AppConstants.title,
    },
    description: AppConstants.description,
  },
};

// cache revalidation
export const revalidate = 14400; // 4 hours

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PermitGuardComponent />
      <SessionManagerComponent />
      <html lang="en">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <meta name="RATING" content="RTA-5042-1996-1400-1577-RTA" />
        </head>
        <body className={clsx(rubik.className, "overflow-x-hidden")}>
          <Header />
          <ClientComponentsWrapper isMocked={isMocked}>
            {children}
          </ClientComponentsWrapper>
          <Footer />
          {!isMocked ? <SpeedInsights /> : null}
        </body>
      </html>
    </>
  );
}
