import {
  initializeAnalytics,
  isSupported as isAnalyticsSupported,
  logEvent,
} from "firebase/analytics";

import { isServer } from "@/src/utils/common.utils";
import { AppInstance } from "@/src/utils/firebase.utils";
import { isDev } from "@/src/utils/envs.utils";

let isSupported = !isServer && !isDev;
const analytics = isSupported && initializeAnalytics(AppInstance);

if (isSupported) {
  isAnalyticsSupported()
    .then(() => {
      isSupported = true;
      console.log("GA initialized");
    })
    .catch((error) => {
      console.error("Failed to initialize GA", error);
    });
}
export const AnalyticsUtils = {
  init: () => {
    if (isSupported && AppInstance) initializeAnalytics(AppInstance);
  },
  logEvent: (
    eventName: string,
    payload?: { [key: string]: string | number }
  ) => {
    if (analytics && isSupported) {
      logEvent(analytics, eventName, payload);
    }
  },
};
