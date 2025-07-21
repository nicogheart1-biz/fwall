import { CmsService } from "@/src/services";
import { CmsPageI } from "@/src/types/cms.types";
import { capitalize } from "@/src/utils/common.utils";
import { cache } from "react";
import { VideoProvidersService } from "@/src/services/videoProviders.service";
import WallComponent from "@/components/wall/wall.component";
import VideoProviders from "@/mock/videoProviders/videoProviders.json";
import { PageComponent } from "@/components/page";
import TagList from "@/mock/tags/tags.json";
import { SsrRedirect } from "@/src/utils/ssr.utils";
import { AppConstants } from "@/src/constants";

// cache revalidation
export const revalidate = 21600; // 6 hours

const getCmsData = cache(async () => {
  try {
    const response = await CmsService.getLocalPage("home");
    return response;
  } catch (error) {
    throw new Error("Failed to fetch home data");
  }
});

const calcVideoProviders = (searchParam: string) => ({
  ...VideoProviders,
  pornhub: {
    ...VideoProviders.pornhub,
    queries: [
      {
        keyword: searchParam,
        ordering: "mostviewed",
        page: 1,
        period: "alltime",
      },
      {
        keyword: searchParam,
        ordering: "rating",
        page: 1,
        period: "alltime",
      },
    ],
  },
  eporner: {
    ...VideoProviders.eporner,
    queries: [
      `?query=${searchParam}&per_page=24&page=1&thumbsize=medium&order=most-popular&gay=0&lq=0&format=json`,
      `?query=${searchParam}&per_page=24&page=1&thumbsize=medium&order=top-rated&gay=0&lq=0&format=json`,
    ],
  },
  redtube: {
    ...VideoProviders.redtube,
    queries: [
      `?data=redtube.Videos.searchVideos&output=json&search=${searchParam}&thumbsize=big&page=1&ordering=mostviewed&period=alltime`,
      `?data=redtube.Videos.searchVideos&output=json&search=${searchParam}&thumbsize=big&page=2&ordering=mostviewed&period=alltime`,
    ],
  },
});

const getVideosWall = cache(async (searchParam: string) => {
  try {
    // @ts-ignore
    const response = await VideoProvidersService.getVideos(
      // @ts-ignore
      calcVideoProviders(searchParam)
    );
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch trending videos data, ${error}`);
  }
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: rawTag } = await params;
  const tag = rawTag.replaceAll("-", " ");
  if (TagList.tags.indexOf(tag) !== -1) {
    return {
      title: `${capitalize(tag)} Videos`,
      description: `Selection of ${tag} videos. ${AppConstants.description}`,
    };
  }
}

export async function generateStaticParams() {
  return TagList.tags.map((tag: string) => ({
    tag: tag.replaceAll(" ", "-"),
  }));
}

export default async function Tag({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: rawTag } = await params;
  const tag = rawTag.replaceAll("-", " ");
  if (TagList.tags.indexOf(tag) === -1) {
    SsrRedirect("/404");
    return null;
  }

  const data = (await getCmsData()) as CmsPageI;
  const { ["main-hero"]: mainHero } = data;

  const contents = (await getVideosWall(tag)) as {
    [videoProvider: string]: any;
  };

  if (!contents.pornhub?.length) {
    contents.pornhub = (
      await import(`@/mock/videoProviders/pornhub/tag/${rawTag}.json`)
    ).videos;
  }

  return (
    <>
      <PageComponent hero={mainHero} />
      <WallComponent
        contents={contents}
        title={`"${capitalize(tag)}" Videos`}
        page={`tag/${rawTag}`}
      />
    </>
  );
}
