"use client";
import { PaginationComponent, VideoCard } from "@/components";
import { scrollToId } from "@/src/utils/common.utils";
import { useEffect, useState } from "react";
import AdsBlock from "@/components/ads/adsBlock.component";
import { AdsBlockTypeEnum } from "@/src/enums/ads.enums";

type WallClientI = {
  contents?: any;
  title?: string;
  videoProviders?: { [videoProvider: string]: any };
  videos: any[];
};

const pageSize = 24;

const WallClient = (props: WallClientI) => {
  const { contents, videoProviders = {}, title, videos: eVideos = [] } = props;
  const [videos, setVideos] = useState(eVideos);
  const [page, setPage] = useState(1);

  const getVideoPage = () =>
    videos.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

  const [videoSection, setVideoSection] = useState<{
    first: any[];
    second: any[];
  }>({
    first: [],
    second: [],
  });

  useEffect(() => {
    const secondSection =
      getVideoPage().length >= 12 && getVideoPage().length % 6 === 0;
    setVideoSection({
      first: getVideoPage().slice(
        0,
        secondSection ? getVideoPage().length / 2 : getVideoPage().length
      ),
      second: secondSection
        ? getVideoPage().slice(getVideoPage().length / 2, getVideoPage().length)
        : [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  /*const getPornHubVideos = async () => {
    try {
      if (videoProviders?.pornhub) {
        const response = await ApiService.post(apiVideoProvider.PORNHUB(), {
          ...videoProviders.pornhub,
          active: true,
        });
        // @ts-ignore
        if (response?.data?.length) {
          setVideos(
            // @ts-ignore
            VideoProvidersUtils.randomSort([...videos, ...response.data])
          );
        }
      }
      const response = await fetch("https://pornhub.com/webmasters/search?search=feet%2Bworship&page=1&period=weekly&ordering=mostviewed&thumbsize=large_hd", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
        }
      });
    } catch (error) {
      console.error(error);
    }
  };*/

  /*useEffect(() => {
    if (!contents.pornhub?.length) {
      getPornHubVideos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contents]);*/

  //console.log('contents', contents);

  return (
    <section
      className="mx-auto max-w-screen-xl py-4 px-4 sm:px-6 lg:px-8"
      id="video-grid"
    >
      {title ? <h2 className="py-4 text-lg font-medium">{title}</h2> : null}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-6">
        {videoSection.first.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
      {videoSection.second?.length ? (
        <>
          <AdsBlock type={AdsBlockTypeEnum.HORIZONTAL} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-6">
            {videoSection.second.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </>
      ) : null}
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
