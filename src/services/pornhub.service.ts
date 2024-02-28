import { PornHub, WebmasterSearchOptions } from "pornhub.js";
import {
  VideoProviderI,
  VideoProviderQueryI,
} from "@/src/types/videoProvider.types";

export const PornhubService = {
  getVideos: async (videoProvider: VideoProviderI) =>
    new Promise(async (resolve, reject) => {
      try {
        const pornhub = new PornHub();
        const promises = [];
        const defaultPornHubQuery: WebmasterSearchOptions = {
          page: 1,
          ordering: "newest",
          period: "weekly",
          thumbsize: "large_hd",
        };
        if (videoProvider.queries?.length) {
          videoProvider.queries.forEach((q) => {
            const query = q as VideoProviderQueryI;
            promises.push(
              pornhub.webMaster.search(query.keyword, {
                ...defaultPornHubQuery,
                ...(q as WebmasterSearchOptions),
              })
            );
          });
        } else {
          promises.push(pornhub.webMaster.search("feet", defaultPornHubQuery));
        }
        const results = await Promise.allSettled(promises);
        if (results?.length) {
          let response: any[] = [];
          results.forEach((result) => {
            // @ts-ignore
            if (result.status === "fulfilled" && result?.value?.length) {
              // @ts-ignore
              response = [...response, ...(result.value || [])];
            }
          });
          resolve(response);
        } else {
          reject();
        }
      } catch (error) {
        console.error(`PornhubService getPornhubVideos error:`, error);
        reject();
      }
    }),
};
