"use client";

import { PaginationComponent, VideoCard } from "@/components";
import { scrollToId } from "@/src/utils/common.utils";
import { useState } from "react";

type WallClientI = {
  videos: any[];
};

const pageSize = 24;

const WallClient = (props: WallClientI) => {
  const { videos = [] } = props;
  const [page, setPage] = useState(1);

  return (
    <section
      className="mx-auto max-w-screen-xl py-4 px-4 sm:px-6 lg:px-8"
      id="video-grid"
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {videos
          .slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
          .map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
      </div>
      <PaginationComponent
        pages={videos.length / pageSize}
        currentPage={page}
        onPageChange={(newPage) => {
          setPage(newPage);
          scrollToId("video-grid");
        }}
      />
    </section>
  );
};

export default WallClient;
