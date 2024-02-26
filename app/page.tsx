import { CmsService } from "@/src/services";
import HomeComponent from "./home.component";
import { CmsPageI } from "@/src/types/cms.types";
import { calcDelay } from "@/src/utils/common.utils";
import { FrequencyEnum } from "@/src/enums/common.enums";
import { cache } from "react";
import { VideoProvidersService } from "@/src/services/videoProviders.service";
import WallComponent from "@/components/wall/wall.component";
import VideoProviders from "@/mock/videoProviders/videoProviders.json";

const pageKeywords = ["feet worship", "socks"];

const videoProviders = {
  ...VideoProviders,
  eporner: {
    ...VideoProviders.eporner,
    queries: [
      `?query=${pageKeywords[0]}&per_page=6&page=1&thumbsize=medium&order=latest&gay=0&lq=0&format=json`,
      `?query=${pageKeywords[0]}&per_page=6&page=1&thumbsize=medium&order=top-weekly&gay=0&lq=0&format=json`,
      `?query=${pageKeywords[1]}&per_page=6&page=1&thumbsize=medium&order=latest&gay=0&lq=0&format=json`,
      `?query=${pageKeywords[1]}&per_page=6&page=1&thumbsize=medium&order=top-weekly&gay=0&lq=0&format=json`,
    ],
  },
  redtube: {
    ...VideoProviders.redtube,
    queries: [
      `?data=redtube.Videos.searchVideos&output=json&search=${pageKeywords[0]}&thumbsize=big&page=1&ordering=newest&period=weekly`,
      `?data=redtube.Videos.searchVideos&output=json&search=${pageKeywords[1]}&thumbsize=big&page=1&ordering=newest&period=weekly`,
    ],
  },
};

// cache revalidation
export const revalidate = calcDelay(30, FrequencyEnum.MINUTES);

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
    const response = await VideoProvidersService.getVideos(videoProviders);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch wall videos data, ${error}`);
  }
});

export default async function Home() {
  const data = (await getCmsData()) as CmsPageI;
  const { ["main-hero"]: mainHero } = data;

  const contents = (await getVideosWall()) as { [videoProvider: string]: any };

  return (
    <>
      <HomeComponent hero={mainHero} />
      <WallComponent contents={contents} title="Latest Feet Videos" />
    </>
  );
}
