import { VideoProvidersService } from "@/src/services/videoProviders.service";
import WallComponent from "@/components/wall/wall.component";
import VideoProviders from "@/mock/videoProviders/videoProviders.json";
import TagList from "@/mock/tags/tags.json";
import PornhubLocalClient from "./pornhubLocalClient.component";

const latest = {
  ordering: ["newest"],
  period: "weekly",
  keywords: ["feet-worship", "socks"],
};
const trending = {
  ordering: ["mostviewed"],
  period: "weekly",
  keywords: ["feet-worship", "socks"],
};
const tags = TagList.tags.map(tag => ({
  ordering: ["mostviewed", "rating"],
  period: "alltime",
  keywords: [tag.replace(" ", "-")],
}));

const section = tags[15];

const queries: any[] = [];
section.keywords.forEach((key) => {
  section.ordering.forEach((order) =>
    queries.push({
      keyword: key,
      ordering: order,
      page: 1,
      period: section.period || "alltime",
    })
  );
});
const videoProviders = {
  pornhub: {
    ...VideoProviders.pornhub,
    /*queries: pageKeywords.map((keyword) => ({
      keyword: keyword,
      ordering: "newest",
      page: 1,
      period: "weekly",
    })),*/
    queries,
  },
};

const getVideosWall = async () => {
  try {
    console.log("videoProviders", videoProviders.pornhub.queries);
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
      <PornhubLocalClient contents={contents.pornhub} />
      <WallComponent contents={contents} title="Local Pornhub" />
    </>
  );
}
