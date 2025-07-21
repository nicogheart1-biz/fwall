import { SimplePage } from "@/components";
import { Routes } from "@/src/routes";
import { CmsService } from "@/src/services/cms.service";
import { CmsPageI } from "@/src/types/cms.types";
import { Metadata } from "next";
import { cache } from "react";

// cache revalidation
export const revalidate = 86400 // 24 hours;

export const metadata: Metadata = {
  title: Routes.rta.title,
};

const getCmsData = cache(async () => {
  try {
    const response = await CmsService.getLocalPage("rta");
    return response;
  } catch (error) {
    throw new Error("Failed to fetch rta data");
  }
});

export default async function RTA() {
  const data = (await getCmsData()) as CmsPageI;
  const { title = "RTA", text, html } = data;
  return (
    <section className="py-4">
      <SimplePage title={title} text={text} html={html} />
    </section>
  );
}
