import { ApiService } from "@/src/services";
import { VideoProviderI } from "@/src/types/videoProvider.types";
import { PornhubService } from "@/src/services/pornhub.service";
import { VideoProvidersUtils } from "@/src/utils/videoProviders.utils";

export const VideoProvidersService = {
  getProviderVideos: async (videoProvider: VideoProviderI) =>
    new Promise(async (resolve, reject) => {
      try {
        const promises = [];
        if (videoProvider.queries?.length) {
          videoProvider.queries.forEach((query) => {
            promises.push(ApiService.get(`${videoProvider.api}${query}`));
          });
        } else if (videoProvider.api) {
          promises.push(ApiService.get(videoProvider.api));
        }
        const results = await Promise.allSettled(promises);
        if (results?.length) {
          let response: any[] = [];
          results.forEach((result) => {
            // @ts-ignore
            if (result.status === "fulfilled" && result?.value) {
              // @ts-ignore
              response = [...response, ...(result.value?.videos || [])];
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

  getVideos: async (videoProviders: {
    [videoProvider: string]: VideoProviderI;
  }) =>
    new Promise(async (resolve, reject) => {
      try {
        const promises: Promise<any>[] = [];
        Object.values(videoProviders)
          .filter((videoProvider) => videoProvider.active)
          .forEach((videoProvider) => {
            switch (videoProvider.id) {
              case "pornhub": {
                promises.push(PornhubService.getVideos(videoProvider));
                break;
              }
              case "eporner":
              case "redtube":
              default: {
                promises.push(
                  VideoProvidersService.getProviderVideos(videoProvider)
                );
                break;
              }
            }
          });
        const results = await Promise.allSettled(promises);
        if (results?.length) {
          const response: { [key: string]: any } = {};
          Object.values(videoProviders)
            .filter((videoProvider) => videoProvider.active)
            .forEach((videoProvider, i) => {
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
  getVideoDetails: async (
    provider: VideoProviderI["id"],
    videoId: string,
    page?: string
  ) =>
    new Promise(async (resolve, reject) => {
      try {
        const videoProvider = VideoProvidersUtils.getVideoProvider(provider);
        if (videoProvider) {
          switch (videoProvider.id) {
            case "pornhub": {
              if (page) {
                const { videos = [] } = await import(
                  `@/mock/videoProviders/pornhub/${page}.json`
                );
                const video = videos.find((v: any) => v.video_id === videoId);
                if (video) {
                  resolve(
                    VideoProvidersUtils.formatVideos({
                      [videoProvider.id]: [video],
                    })
                  );
                } else {
                  reject();
                }
              }
              break;
            }
            case "eporner":
            case "redtube": {
              if (videoProvider.details) {
                const response = await ApiService.get(
                  videoProvider.details.replaceAll("*VIDEOID*", videoId)
                );
                resolve(
                  VideoProvidersUtils.formatVideos({
                    [videoProvider.id]: [response],
                  })
                );
              }

              break;
            }
          }
        } else {
          reject();
        }
      } catch (error) {
        console.error("VideoProvidersService getVideoDetails error:", error);
        reject();
      }
    }),
};
