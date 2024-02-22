import clsx from "clsx";
import { VideoCard } from "@/components";

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
        contents[videoProvider].forEach((video: any) => {
          videos.push({
            ...video,
            length: video.length_min,
            title: video.title.toLowerCase() || "Feet",
            provider: videoProvider,
          });
        });
      }
    });
    return videos;
  };

  return (
    <section
      className={clsx("mx-auto max-w-screen-xl py-4 px-4 sm:px-6 lg:px-8")}
    >
      <div className="grid grid-cols-1 p-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {getVideos().map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </section>
  );
};

export default WallComponent;
