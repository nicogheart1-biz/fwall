import { VideoCard } from "@/components";
import { formatSeconds } from "@/src/utils/common.utils";

type WallComponentI = {
  contents?: { [videoProvider: string]: any };
};

const WallComponent = (props: WallComponentI) => {
  const { contents = {} } = props;
  //console.log("contents", contents);
  const getVideos = () => {
    const videos: any[] = [];
    Object.keys(contents).forEach((videoProvider) => {
      if (contents[videoProvider]?.length) {
        switch (videoProvider) {
          case "pornhub": {
            const data = JSON.parse(contents[videoProvider]);
            Object.values(data).forEach((video: any) => {
              videos.push({
                //...video,
                cover: video.thumb_large || video.thumb,
                id: new Date(video.pubDate).getTime(),
                length: formatSeconds(Number(video.duration)),
                provider: videoProvider,
                title: video.title.toLowerCase() || "Feet",
                thumbs: video.thumbs || [],
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
                cover: video.thumbs[0] || video.thumb || video.default_thumb,
                id: video.video_id,
                length: video.duration,
                provider: videoProvider,
                rate: video.rating,
                title: video.title.toLowerCase() || "Feet",
                thumbs: video.thumbs || [],
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
                cover: video.default_thumb || video.thumbs[0],
                id: video.id,
                length: video.length_min,
                provider: videoProvider,
                rate: video.rate,
                title: video.title.toLowerCase() || "Feet",
                thumbs: video.thumbs || [],
                url: video.url,
                views: video.views,
              });
            });
            break;
          }
        }
      }
    });
    return videos;
  };

  return (
    <section className="mx-auto max-w-screen-xl py-4 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {getVideos()
          .sort(() => Math.random() - 0.5)
          .map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
      </div>
    </section>
  );
};

export default WallComponent;
