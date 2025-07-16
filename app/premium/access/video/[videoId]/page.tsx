import { universalAtob } from "@/src/utils/common.utils";
import { VideoProvidersService } from "@/src/services/videoProviders.service";
import VideoPageComponent from "./videoPage.component";
import { VideoI } from "@/src/types/videoProvider.types";
import { SsrRedirect } from "@/src/utils/ssr.utils";
import { Routes } from "@/src/routes";
import { PremiumGuard } from "@/components/premium";
import WallComponent from "@/components/wall/wall.component";
import { cache } from "react";
import premiumVideosMock from "@/mock/premium/videos.json";

const getVideoDetails = cache(async (provider: string, videoId: string) => {
  try {
    const response = await VideoProvidersService.getVideoDetails(
      provider,
      videoId
    );
    return response;
  } catch (error) {
    SsrRedirect(Routes.premium.url);
    throw new Error(`Failed to fetch video ${videoId} details, ${error}`);
  }
});

const getVideosWall = cache((videoId: string) => {
  try {
    return {
      "feet-video": premiumVideosMock.filter(
        (video) => video.premium && video.id !== videoId
      ),
    };
  } catch (error) {
    throw new Error(`Failed to fetch home videos data, ${error}`);
  }
});

export default async function PremiumVideo({
  params,
}: {
  params: { videoId: string };
}) {
  const [provider, videoId] = universalAtob(
    decodeURIComponent(params.videoId)
  ).split(";");
  const videoDetails = (await getVideoDetails(provider, videoId)) as VideoI[];
  // console.log("videoDetails", videoDetails);

  if (!videoDetails || !videoDetails?.length) {
    SsrRedirect(Routes.premium.url);
    return null;
  }

  const suggestedContents = (await getVideosWall(videoId)) as {
    [videoProvider: string]: any;
  };

  return (
    <PremiumGuard>
      <section className="mx-auto max-w-screen-xl py-4 px-4 sm:px-6 lg:px-8">
        <VideoPageComponent premium videoDetails={videoDetails[0]} />
        <WallComponent
          contents={suggestedContents}
          title="Other Premium Videos"
          page="latest"
          premium
        />
      </section>
    </PremiumGuard>
  );
}
