"use client";

import { AdsBlockTypeEnum } from "@/src/enums/ads.enums";
import dynamic from "next/dynamic";

const AdsHorizontalBanner = dynamic(
  () => import("@/components/ads/adsHorizontalBanner.component"),
  { ssr: false }
);
const AdsVerticalBanner = dynamic(
  () => import("@/components/ads/adsVerticalBanner.component"),
  { ssr: false }
);
const AdsSquareBanner = dynamic(
  () => import("@/components/ads/adsSquareBanner.component"),
  { ssr: false }
);

type AdsBlockI = {
  type?: AdsBlockTypeEnum;
};

const AdsBlock = (props: AdsBlockI) => {
  const { type = AdsBlockTypeEnum.HORIZONTAL } = props;

  switch (type) {
    case AdsBlockTypeEnum.HORIZONTAL:
    default:
      return <AdsHorizontalBanner />;
    case AdsBlockTypeEnum.VERTICAL:
      return <AdsVerticalBanner />;
    case AdsBlockTypeEnum.SQUARE:
      return <AdsSquareBanner />;
  }
};

export default AdsBlock;
