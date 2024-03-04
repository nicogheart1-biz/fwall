import { calcDelay, universalAtob } from "@/src/utils/common.utils";
import { FrequencyEnum } from "@/src/enums/common.enums";
import { cache } from "react";
import { VideoProvidersService } from "@/src/services/videoProviders.service";
import VideoPageComponent from "./videoPage.component";
import { VideoI } from "@/src/types/videoProvider.types";

// cache revalidation
export const revalidate = calcDelay(24, FrequencyEnum.HOURS);

const getVideoDetails = cache(async (videoId: string) => {
  try {
    const param = universalAtob(videoId).split(";");
    const response = await VideoProvidersService.getVideoDetails(
      param[0],
      param[1]
    );
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch video ${videoId} details, ${error}`);
  }
});

/*export async function generateMetadata({
  params,
}: {
  params: { videoId: string };
}) {
  //const tag = params.tag.replaceAll("-", " ");
  return {
      title: `${capitalize(tag)} Videos`,
      description: `Selection of ${tag} videos. ${AppConstants.description}`,
    };
}*/

export default async function Video({
  params,
}: {
  params: { videoId: string };
}) {
  const videoDetails = (await getVideoDetails(
    decodeURIComponent(params.videoId)
  )) as VideoI[];
  //console.log('videoDetails', videoDetails)

  return (
    <section className="mx-auto max-w-screen-xl py-4 px-4 sm:px-6 lg:px-8">
      <VideoPageComponent videoDetails={videoDetails[0]} />
    </section>
  );
}
