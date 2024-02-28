import { VideoProvidersService } from "@/src/services/videoProviders.service";
import WallComponent from "@/components/wall/wall.component";
import VideoProviders from "@/mock/videoProviders/videoProviders.json";
import dynamic from "next/dynamic";

const PornhubLocal = dynamic(() => import("./pornhubLocal.component"), {
  ssr: false,
});

const pageKeywords = ["feet worship", "socks"];
const tag = "feet";

const videoProviders = {
  pornhub: {
    ...VideoProviders.pornhub,
    /*queries: pageKeywords.map((keyword) => ({
      keyword: keyword,
      ordering: "newest",
      page: 1,
      period: "weekly",
    })),*/
    queries: [
      {
        keyword: tag,
        ordering: "mostviewed",
        page: 1,
        period: "alltime",
      },
      {
        keyword: tag,
        ordering: "rating",
        page: 1,
        period: "alltime",
      },
    ]
  },
};

const getVideosWall = async () => {
  try {
    // @ts-ignore
    const response = await VideoProvidersService.getVideos(videoProviders);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch home videos data, ${error}`);
  }
};

export default async function LocalPornhub() {
  const contents = (await getVideosWall()) as { [videoProvider: string]: any };

  return (
    <>
      <PornhubLocal contents={contents.pornhub} />
      <WallComponent
        contents={contents}
        title="Local Pornhub"
      />
    </>
  );
}
