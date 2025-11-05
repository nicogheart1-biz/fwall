"use client";
import { AdsAda } from "@/src/constants/ads.constants";

const AdsSquareBanner = () => {
  return (
    <div className="relative w-full mx-auto inline-flex justify-center py-4 px-4 sm:px-6 lg:px-8">
      <iframe
        style={{ backgroundColor: "#02060e" }}
        width="315"
        height="300"
        // @ts-ignore
        allowtransparency="true"
        name="spot_id_10002484"
        src={`//a.adtng.com/get/10002484?ata=${AdsAda}`}
      ></iframe>
    </div>
  );
};

export default AdsSquareBanner;
