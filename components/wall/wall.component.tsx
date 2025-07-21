import { VideoCard } from "@/components";
import React from "react";
import { VideoProvidersUtils } from "@/src/utils/videoProviders.utils";
import WallClientWrapper from "./wallClientWrapper.component";

type WallComponentI = {
  contents?: { [videoProvider: string]: any };
  page?: string;
  title?: string;
  videoProviders?: {[videoProvider: string]: any};
};

const WallComponent = (props: WallComponentI) => {
  const { contents = {}, page, title } = props;
  //console.log("contents", contents);

  const videos = VideoProvidersUtils.randomSort(
    VideoProvidersUtils.formatVideos(contents)
  );

  return (
    <>
      <WallClientWrapper
        title={title}
        videos={videos}
        contents={contents}
        page={page}
      />
      <section className="sr-only mx-auto max-w-screen-xl py-4 px-4 sm:px-6 lg:px-8">
        {title ? <h2 className="py-4 text-lg font-medium">{title}</h2> : null}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} page={page} />
          ))}
        </div>
      </section>
    </>
  );
};

export default WallComponent;
