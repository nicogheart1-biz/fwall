import { SimplePage } from "@/components";
import { FrequencyEnum } from "@/src/enums/common.enums";
import { Routes } from "@/src/routes";
import { CmsService } from "@/src/services/cms.service";
import { CmsPageI } from "@/src/types/cms.types";
import { calcDelay } from "@/src/utils/common.utils";
import { Metadata } from "next";
import { cache } from "react";

// cache revalidation
export const revalidate = calcDelay(8, FrequencyEnum.HOURS);

export const metadata: Metadata = {
  title: Routes.termsConditions.title,
};

const getCmsData = cache(async () => {
  try {
    const response = await CmsService.getLocalPage("terms-and-conditions");
    return response;
  } catch (error) {
    throw new Error("Failed to fetch terms-and-conditions data");
  }
});

export default async function TermsAndConditions() {
  const data = (await getCmsData()) as CmsPageI;
  const { title = "Terms & Conditions", text } = data;
  return (
    <section className="py-4">
      <SimplePage title={title} text={text} />
    </section>
  );
}
