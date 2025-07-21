'use client';

import dynamic from "next/dynamic";
import { AdsBlockTypeEnum } from "@/src/enums/ads.enums";
import { ReactNode } from "react";

const AdultsBanner = dynamic(
  () => import("@/components/@core/AdultsBanner/adultsBanner.component"),
  { ssr: false }
);
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
const AdsBlock = dynamic(() => import("@/components/ads/adsBlock.component"), {
  ssr: false,
});
const AdsColumn = dynamic(
  () => import("@/components/ads/adsColumn.component"),
  {
    ssr: false,
  }
);

interface ClientComponentsWrapperProps {
  isMocked: boolean;
  children: ReactNode;
}

export default function ClientComponentsWrapper({ isMocked, children }: ClientComponentsWrapperProps) {
  return (
    <>
      <SkipContentComponent />
      <main id="MainContent" className="relative min-h-screen pt-20">
        {!isMocked && <AdsColumn position="left" />}
        {children}
        {!isMocked && <AdsColumn position="right" />}
        {!isMocked && <AdsBlock type={AdsBlockTypeEnum.HORIZONTAL} />}
      </main>
      <GlobalLoaderManager />
      <ToastManagerComponent />
      <CookieBannerComponent />
      <AdultsBanner />
    </>
  );
}
