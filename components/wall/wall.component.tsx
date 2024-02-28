import { VideoCard } from "@/components";
import { VideoProvidersService } from "@/src/services/videoProviders.service";
import React from "react";
import dynamic from "next/dynamic";

const WallClient = dynamic(() => import("./wallClient.component"), {
  ssr: false,
});

type WallComponentI = {
  contents?: { [videoProvider: string]: any };
  title?: string;
};

const WallComponent = (props: WallComponentI) => {
  const { contents = {}, title } = props;
  //console.log("contents", contents);

  const videos = VideoProvidersService.formatVideos(contents).sort(
    () => Math.random() - 0.5
  );

  return (
    <>
      <WallClient title={title} videos={videos} contents={contents} />
      <section className="sr-only mx-auto max-w-screen-xl py-4 px-4 sm:px-6 lg:px-8">
        {title ? <h2 className="py-4 text-lg font-medium">{title}</h2> : null}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </section>
    </>
  );
};

export default WallComponent;
