import VideoProviders from "@/mock/videoProviders/videoProviders.json";
import { ApiService } from "@/src/services";
import { VideoProviderI } from "@/src/types/videoProvider.types";

export const VideoProvidersService = {
  getProviderVideos: async (videoProvider: VideoProviderI) =>
    new Promise(async (resolve, reject) => {
      try {
        const promises = [];
        if (videoProvider.queries?.length) {
          videoProvider.queries.forEach((query) => {
            promises.push(ApiService.get(`${videoProvider.api}${query}`));
          });
        } else {
          promises.push(ApiService.get(videoProvider.api));
        }
        const results = await Promise.allSettled(promises);
        if (results?.length) {
          let response: any[] = [];
          results.forEach((result) => {
            // @ts-ignore
            if (result.status === "fulfilled" && result?.value?.videos?.length) {
              // @ts-ignore
              response = [...response, ...result.value.videos];
            }
          });
          resolve(response);
        } else {
          reject();
        }
      } catch (error) {
        console.error(
          `VideoProvidersService getProviderVideos ${videoProvider.id} error:`,
          error
        );
        reject();
      }
    }),
  getVideosWall: async () =>
    new Promise(async (resolve, reject) => {
      try {
        const promises: Promise<any>[] = [];
        Object.values(VideoProviders).forEach((videoProvider) => {
          promises.push(VideoProvidersService.getProviderVideos(videoProvider));
        });
        const results = await Promise.allSettled(promises);
        if (results?.length) {
          const response: { [key: string]: any } = {};
          Object.values(VideoProviders).forEach((videoProvider, i) => {
            // @ts-ignore
            if (results[i]?.status === "fulfilled" && results[i]?.value) {
              // @ts-ignore
              response[videoProvider.id] = results[i].value;
            }
          });
          resolve(response);
        } else {
          reject();
        }
      } catch (error) {
        console.error("VideoProvidersService getVideosWall error:", error);
        reject();
      }
    }),
};
