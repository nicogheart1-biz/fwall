import clsx from "clsx";
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
                ...video,
                id: new Date(video.pubDate).getTime(),
                url: video.link,
                length: formatSeconds(Number(video.duration)),
                provider: videoProvider,
                cover: video.thumb_large || video.thumb,
                title: video.title.toLowerCase() || "Feet",
              });
            });
            break;
          }
          case "eporner":
          default: {
            contents[videoProvider].forEach((video: any) => {
              videos.push({
                ...video,
                cover: video.default_thumb || video.thumbs[0],
                length: video.length_min,
                title: video.title.toLowerCase() || "Feet",
                provider: videoProvider,
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
    <section
      className={clsx("mx-auto max-w-screen-xl py-4 px-4 sm:px-6 lg:px-8")}
    >
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
