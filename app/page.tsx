import { CmsService } from "@/src/services";
import HomeComponent from "./home.component";
import { CmsPageI } from "@/src/types/cms.types";
import { calcDelay } from "@/src/utils/common.utils";
import { FrequencyEnum } from "@/src/enums/common.enums";
import { cache } from "react";
import { VideoProvidersService } from "@/src/services/videoProviders.service";
import WallComponent from "@/components/wall/wall.component";

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
    const response = await VideoProvidersService.getVideosWall();
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
      <WallComponent contents={contents} />
    </>
  );
}
