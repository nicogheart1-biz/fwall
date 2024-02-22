import { Rubik } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Footer, Header } from "@/components";
import {
  PermitGuardComponent,
  SessionManagerComponent,
} from "@/components/@core";
import "@/components/@core/skipContent/skip-content.style.css";
import { Metadata } from "next";
import { AppConstants } from "@/src/constants";
import clsx from "clsx";
import { calcDelay } from "@/src/utils/common.utils";
import { FrequencyEnum } from "@/src/enums/common.enums";

const CookieBannerComponent = dynamic(
  () => import("@/components/@core/cookieBanner/cookie-banner.component"),
  { ssr: false }
);
const GlobalLoaderManager = dynamic(
  () => import("@/components/@core/globalLoaderManager/globalLoaderManager"),
  { ssr: false }
);
const SkipContentComponent = dynamic(
  () => import("@/components/@core/skipContent/skipContent.component"),
  { ssr: false }
);
const ToastManagerComponent = dynamic(
  () => import("@/components/@core/toastManager/toastManager.component"),
  { ssr: false }
);

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
export const revalidate = calcDelay(4, FrequencyEnum.HOURS);

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
        </head>
        <body className={clsx(rubik.className, "overflow-x-hidden")}>
          <SkipContentComponent />
          <Header />
          <main id="MainContent" className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
          <GlobalLoaderManager />
          <ToastManagerComponent />
          <CookieBannerComponent />
        </body>
      </html>
    </>
  );
}
