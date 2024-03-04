import VideoProviders from "@/mock/videoProviders/videoProviders.json";
import { VideoProviderI } from "@/src/types/videoProvider.types";

export const VideoProvidersUtils = {
  formatVideos: (contents: { [videoProvider: string]: any }) => {
    try {
      const videos: any[] = [];
      Object.keys(contents).forEach((videoProvider) => {
        if (contents[videoProvider]?.length) {
          switch (videoProvider) {
            case "pornhub": {
              const data = contents[videoProvider] || [];
              data.forEach((video: any) => {
                videos.push({
                  //...video,
                  cover: video.preview || video.thumb || video.default_thumb,
                  embedUrl: `https://www.pornhub.com/embed/${video.id || video.video_id || `ph-${new Date().getTime()}`}`,
                  id:
                    video.id || video.video_id || `ph-${new Date().getTime()}`,
                  length: video.duration,
                  provider: videoProvider,
                  title: video.title.toLowerCase() || "Feet",
                  thumbs:
                    video.thumbs?.map((thumb: any) => thumb?.src || thumb) ||
                    [],
                  url: video.url,
                  views: video.views,
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
                  embedUrl: video.embed_url,
                  id: video.video_id,
                  length: video.duration,
                  provider: videoProvider,
                  rate: video.rating,
                  title: video.title.toLowerCase() || "Feet",
                  thumbs:
                    video.thumbs?.map((thumb: any) => thumb?.src || thumb) ||
                    [],
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
                  embedUrl: video.embed,
                  id: video.id,
                  length: video.length_min,
                  provider: videoProvider,
                  rate: video.rate,
                  title: video.title.toLowerCase() || "Feet",
                  thumbs:
                    video.thumbs?.map((thumb: any) => thumb?.src || thumb) ||
                    [],
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
      console.error("VideoProvidersUtils formatVideos error:", error);
      return [];
    }
  },
  randomSort: (array: any[]) => array.sort(() => Math.random() - 0.5),
  getVideoProvider: (provider: string): VideoProviderI | undefined => {
    try {
      return Object.values(VideoProviders).find(
        (videoProvider: VideoProviderI) => videoProvider.id === provider
      );
    } catch (error) {
      console.error("VideoProvidersUtils getVideoProvider error:", error);
      return;
    }
  },
};
