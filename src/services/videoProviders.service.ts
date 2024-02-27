import { ApiService } from "@/src/services";
import { VideoProviderI } from "@/src/types/videoProvider.types";
import { xml2json } from "xml-js";
import { formatSeconds } from "@/src/utils/common.utils";

const extractPornhubVideos = (elements: any[] = []) => {
  try {
    let a: { [key: string]: any } = {};
    elements.forEach((el: { name: string; elements: any[] }, i) => {
      if (el.name === "item") {
        el.elements.forEach(({ name, elements: els }) => {
          a[i] = {
            ...a[i],
            [name]: els[0].cdata || els[0].text,
          };
        });
      } else {
        a = { ...a, ...extractPornhubVideos(el.elements) };
      }
    });
    return a;
  } catch (error) {
    console.error(`VideoProvidersService extractPornhubVideos error:`, error);
  }
};

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
  getPornhubVideos: async (videoProvider: VideoProviderI) =>
    new Promise(async (resolve, reject) => {
      try {
        const data = await fetch(videoProvider.api, {
          method: "GET",
        });
        const test = await data.text();
        console.log("Pornhub response obtained:", xml2json(test));
        const response = extractPornhubVideos(
          JSON.parse(xml2json(await data.text()))?.elements?.[1]?.elements
        );
        console.log("Pornhub response extracted", JSON.stringify(response));
        resolve(JSON.stringify(response));
      } catch (error) {
        console.error(`VideoProvidersService getPornhubVideos error:`, error);
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
                promises.push(
                  VideoProvidersService.getPornhubVideos(videoProvider)
                );
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
  formatVideos: (contents: { [videoProvider: string]: any }) => {
    try {
      const videos: any[] = [];
      Object.keys(contents).forEach((videoProvider) => {
        if (contents[videoProvider]?.length) {
          switch (videoProvider) {
            case "pornhub": {
              const data = JSON.parse(contents[videoProvider] || "{}");
              Object.values(data).forEach((video: any) => {
                videos.push({
                  //...video,
                  cover: video.thumb_large || video.thumb,
                  id: new Date(video.pubDate).getTime(),
                  length: formatSeconds(Number(video.duration)),
                  provider: videoProvider,
                  title: video.title.toLowerCase() || "Feet",
                  thumbs: video.thumbs?.map((thumb: any) => thumb?.src || thumb) || [],
                  url: video.link,
                });
              });
              break;
            }
            case "redtube": {
              contents[videoProvider].forEach(({ video }: { video: any }) => {
                videos.push({
                  //...video,
                  //embed_url
                  cover:
                    video.thumbs[0]?.src ||
                    video.thumbs[0] ||
                    video.thumb ||
                    video.default_thumb,
                  id: video.video_id,
                  length: video.duration,
                  provider: videoProvider,
                  rate: video.rating,
                  title: video.title.toLowerCase() || "Feet",
                  thumbs: video.thumbs?.map((thumb: any) => thumb?.src || thumb) || [],
                  url: video.url,
                  views: video.views,
                });
              });
              break;
            }
            case "eporner":
            default: {
              contents[videoProvider].forEach((video: any) => {
                videos.push({
                  //...video,
                  cover:
                    video.default_thumb?.src ||
                    video.default_thumb ||
                    video.thumbs[0],
                  id: video.id,
                  length: video.length_min,
                  provider: videoProvider,
                  rate: video.rate,
                  title: video.title.toLowerCase() || "Feet",
                  thumbs: video.thumbs?.map((thumb: any) => thumb?.src || thumb) || [],
                  url: video.url,
                  views: video.views,
                });
              });
              break;
            }
          }
        }
      });
      return videos.filter(
        (a, i) => videos.findIndex((s) => a.id === s.id) === i
      );
    } catch (error) {
      console.error("VideoProvidersService formatVideos error:", error);
      return [];
    }
  },
};
