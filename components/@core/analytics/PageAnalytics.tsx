"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnalyticsUtils } from "@/src/utils/analytics.utils";
import { AnalyticsEventEnum } from "@/src/enums/analytics.enums";
import { Routes } from "@/src/routes";

export const PageAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Log page view
    AnalyticsUtils.logEvent(AnalyticsEventEnum.PAGE_VIEW, {
      page_path: pathname,
      page_title: document.title,
    });

    // Log specific page visits
    if (pathname === Routes.trending.url) {
      AnalyticsUtils.logEvent(AnalyticsEventEnum.TRENDING_PAGE_VISIT);
    } else if (pathname === Routes.tags.url) {
      AnalyticsUtils.logEvent(AnalyticsEventEnum.TAGS_PAGE_VISIT);
    } else if (pathname.startsWith(Routes.premium.url)) {
      // This is already handled in premium.client.tsx
    }
  }, [pathname]);

  return null;
};

export default PageAnalytics;
