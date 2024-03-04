import { calcDelay, capitalize, universalAtob } from "@/src/utils/common.utils";
import { FrequencyEnum } from "@/src/enums/common.enums";
import { cache } from "react";
import { VideoProvidersService } from "@/src/services/videoProviders.service";
import VideoPageComponent from "./videoPage.component";
import { VideoI } from "@/src/types/videoProvider.types";
import { SsrRedirect } from "@/src/utils/ssr.utils";
import { Routes } from "@/src/routes";
import VideoProviders from "@/mock/videoProviders/videoProviders.json";
import WallComponent from "@/components/wall/wall.component";

// cache revalidation
export const revalidate = calcDelay(1, FrequencyEnum.HOURS);

const pageKeywords = ["feet"];
const videoProviders = {
  ...VideoProviders,
  pornhub: {
    ...VideoProviders.pornhub,
    queries: pageKeywords.map((keyword) => ({
      keyword: keyword,
      ordering: "newest",
      page: 1,
      period: "weekly",
    })),
  },
  eporner: {
    ...VideoProviders.eporner,
    queries: [
      `?query=${pageKeywords[0]}&per_page=6&page=1&thumbsize=medium&order=latest&gay=0&lq=0&format=json`,
      `?query=${pageKeywords[0]}&per_page=6&page=1&thumbsize=medium&order=top-weekly&gay=0&lq=0&format=json`,
    ],
  },
  redtube: {
    ...VideoProviders.redtube,
    queries: [
      `?data=redtube.Videos.searchVideos&output=json&search=${pageKeywords[0]}&thumbsize=big&page=1&ordering=newest&period=weekly`,
      `?data=redtube.Videos.searchVideos&output=json&search=${pageKeywords[0]}&thumbsize=big&page=2&ordering=newest&period=weekly`,
    ],
  },
};

const getVideoDetails = cache(async (videoId: string) => {
  try {
    const param = universalAtob(videoId).split(";");
    const response = await VideoProvidersService.getVideoDetails(
      param[0],
      param[1],
      param[2]
    );
    return response;
  } catch (error) {
    SsrRedirect(Routes.home.url);
    throw new Error(`Failed to fetch video ${videoId} details, ${error}`);
  }
});

const getVideosWall = cache(async () => {
  try {
    // @ts-ignore
    const response = await VideoProvidersService.getVideos(videoProviders);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch home videos data, ${error}`);
  }
});

export async function generateMetadata({
  params,
}: {
  params: { videoId: string };
}) {
  const videoDetails = (await getVideoDetails(
    decodeURIComponent(params.videoId)
  )) as VideoI[];
  return {
    title: `${capitalize(videoDetails[0].title) || "Feet"} Video`,
  };
}

export default async function Video({
  params,
}: {
  params: { videoId: string };
}) {
  const videoDetails = (await getVideoDetails(
    decodeURIComponent(params.videoId)
  )) as VideoI[];
  //console.log('videoDetails', videoDetails)

  const suggestedContents = (await getVideosWall()) as {
    [videoProvider: string]: any;
  };

  if (!suggestedContents.pornhub?.length) {
    suggestedContents.pornhub = (
      await import(`@/mock/videoProviders/pornhub/latest.json`)
    ).videos;
  }

  return (
    <section className="mx-auto max-w-screen-xl py-4 px-4 sm:px-6 lg:px-8">
      <VideoPageComponent videoDetails={videoDetails[0]} />
      <WallComponent
        contents={suggestedContents}
        title="Related Videos"
        page="latest"
      />
    </section>
  );
}
