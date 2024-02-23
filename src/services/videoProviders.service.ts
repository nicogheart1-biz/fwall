import VideoProviders from "@/mock/videoProviders/videoProviders.json";
import { ApiService } from "@/src/services";
import { VideoProviderI } from "@/src/types/videoProvider.types";
import { xml2json } from "xml-js";

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
  getPornhubVideos: async () =>
    new Promise(async (resolve, reject) => {
      try {
        const data = await fetch(VideoProviders.pornhub.api, {
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
  getVideosWall: async () =>
    new Promise(async (resolve, reject) => {
      try {
        const promises: Promise<any>[] = [];
        Object.values(VideoProviders)
          .filter((videoProvider) => videoProvider.active)
          .forEach((videoProvider) => {
            switch (videoProvider.id) {
              case "pornhub": {
                promises.push(VideoProvidersService.getPornhubVideos());
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
          Object.values(VideoProviders)
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
};
