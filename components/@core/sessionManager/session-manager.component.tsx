"use client";

import { useEffect } from "react";
import { AnalyticsUtils } from "@/src/utils/analytics.utils";

const SessionManagerComponent = () => {

  useEffect(() => {
    AnalyticsUtils.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default SessionManagerComponent;
