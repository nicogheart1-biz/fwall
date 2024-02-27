import { CmsService } from "@/src/services";
import { CmsPageI } from "@/src/types/cms.types";
import { calcDelay } from "@/src/utils/common.utils";
import { FrequencyEnum } from "@/src/enums/common.enums";
import { cache } from "react";
import { PageComponent } from "@/components/page";
import TagList from "@/mock/tags/tags.json";
import TagsComponent from "./tags.component";
import { Metadata } from "next";
import { Routes } from "@/src/routes";

// cache revalidation
export const revalidate = calcDelay(24, FrequencyEnum.HOURS);

export const metadata: Metadata = {
  title: Routes.tags.title,
};

const getCmsData = cache(async () => {
  try {
    const response = await CmsService.getLocalPage("home");
    return response;
  } catch (error) {
    throw new Error("Failed to fetch home data");
  }
});

export default async function Tags() {
  const data = (await getCmsData()) as CmsPageI;
  const { ["main-hero"]: mainHero } = data;

  return (
    <>
      <PageComponent hero={mainHero} />
      <TagsComponent tags={TagList.tags} />
    </>
  );
}
