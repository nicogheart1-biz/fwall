"use client";

import { useEffect } from "react";
import { AnalyticsUtils } from "@/src/utils/analytics.utils";
//import { CookieUtils } from "@/src/utils/cookie.utils";

const SessionManagerComponent = () => {
  useEffect(() => {
    /*const cookie = JSON.parse(
      CookieUtils.getCookie(CookieUtils.CookieCheck) || "{}"
    );
    if (cookie?.["cookie-analytics"]) {
      AnalyticsUtils.init();
    }*/
    AnalyticsUtils.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default SessionManagerComponent;
