import { CmsService } from "@/src/services";
import { CmsPageI } from "@/src/types/cms.types";
import { cache } from "react";
import { VideoProvidersService } from "@/src/services/videoProviders.service";
import WallComponent from "@/components/wall/wall.component";
import VideoProviders from "@/mock/videoProviders/videoProviders.json";
import { PageComponent } from "@/components/page";
import { Routes } from "@/src/routes";
import { Metadata } from "next";

const pageKeywords = ["feet-worship", "socks"];

const videoProviders = {
  ...VideoProviders,
  pornhub: {
    ...VideoProviders.pornhub,
    queries: pageKeywords.map((keyword) => ({
      keyword: keyword,
      ordering: "mostviewed",
      page: 1,
      period: "weekly",
    })),
  },
  eporner: {
    ...VideoProviders.eporner,
    queries: [
      `?query=${pageKeywords[0]}&per_page=12&page=1&thumbsize=medium&order=most-popular&gay=0&lq=0&format=json`,
      `?query=${pageKeywords[0]}&per_page=12&page=1&thumbsize=medium&order=top-rated&gay=0&lq=0&format=json`,
      `?query=${pageKeywords[1]}&per_page=12&page=1&thumbsize=medium&order=most-popular&gay=0&lq=0&format=json`,
      `?query=${pageKeywords[1]}&per_page=12&page=1&thumbsize=medium&order=top-rated&gay=0&lq=0&format=json`,
    ],
  },
  redtube: {
    ...VideoProviders.redtube,
    queries: [
      `?data=redtube.Videos.searchVideos&output=json&search=${pageKeywords[0]}&thumbsize=big&page=1&ordering=mostviewed`,
      `?data=redtube.Videos.searchVideos&output=json&search=${pageKeywords[0]}&thumbsize=big&page=2&ordering=mostviewed`,
      `?data=redtube.Videos.searchVideos&output=json&search=${pageKeywords[1]}&thumbsize=big&page=1&ordering=mostviewed`,
      `?data=redtube.Videos.searchVideos&output=json&search=${pageKeywords[1]}&thumbsize=big&page=2&ordering=mostviewed`,
    ],
  },
};

// cache revalidation
export const revalidate = 14400; // 4 hours

export const metadata: Metadata = {
  title: Routes.trending.title,
};

const getCmsData = cache(async () => {
  try {
    const response = await CmsService.getLocalPage("home");
    return response;
  } catch (error) {
    throw new Error("Failed to fetch home data");
  }
});

const getVideosWall = cache(async () => {
  try {
    // @ts-ignore
    const response = await VideoProvidersService.getVideos(videoProviders);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch trending videos data, ${error}`);
  }
});

export default async function Trending() {
  const data = (await getCmsData()) as CmsPageI;
  const { ["main-hero"]: mainHero } = data;

  const contents = (await getVideosWall()) as { [videoProvider: string]: any };

  if (!contents.pornhub?.length) {
    contents.pornhub = (
      await import(`@/mock/videoProviders/pornhub/trending.json`)
    ).videos;
  }

  return (
    <>
      <PageComponent hero={mainHero} />
      <WallComponent
        contents={contents}
        title={Routes.trending.title}
        page="trending"
      />
    </>
  );
}
