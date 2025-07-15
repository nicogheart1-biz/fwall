import { Routes } from "@/src/routes";
import { Metadata } from "next";
import { FrequencyEnum } from "@/src/enums/common.enums";
import { calcDelay } from "@/src/utils/common.utils";
import PremiumAccessClient from "./access.client";

// cache revalidation
export const revalidate = calcDelay(30, FrequencyEnum.MINUTES);

export const metadata: Metadata = {
    title: Routes.premiumAccess.title,
    description: "Exclusive premium contents area",
    robots: {
        index: false,
        follow: false,
    },
};

export default function PremiumAccessPage() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <PremiumAccessClient />
      </div>
    </section>
  );
}
