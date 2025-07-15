import { Routes } from "@/src/routes";
import { Metadata } from "next";
import { FrequencyEnum } from "@/src/enums/common.enums";
import { calcDelay } from "@/src/utils/common.utils";
import PremiumPageClient from "./premium.client";
import { PremiumConstants } from "@/src/constants/premium.constants";

// cache revalidation
export const revalidate = calcDelay(1, FrequencyEnum.HOURS);

export const metadata: Metadata = {
  title: Routes.premium.title,
  description: `Exclusive premium content - Daily access $${
    PremiumConstants.DAILY_ACCESS_PRICE / 100
  } without registration (anonymous)`,
  openGraph: {
    title: Routes.premium.title,
    description: `Exclusive premium content - Daily access $${
      PremiumConstants.DAILY_ACCESS_PRICE / 100
    } without registration (anonymous)`,
  },
};

export default function PremiumPage() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-secondary-300 mb-4">
              Exclusive Premium Contents
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Explore our collection of high-quality premium videos.
              <br />
              <br />
              <span className="text-2xl">
                Daily access for{" "}
                <strong className="text-secondary-100">
                  only ${PremiumConstants.DAILY_ACCESS_PRICE / 100}
                </strong>
              </span>
              <br />
              <br />
              Completely <strong>anonymous</strong>, no registration required.
            </p>
          </div>

          {/* Client Component per gestire l'interattività */}
          <PremiumPageClient />
        </div>
      </div>
    </section>
  );
}
