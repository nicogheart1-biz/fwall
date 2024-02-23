"use client";
import { AdsAda } from "@/src/constants/ads.constants";
import AdsSquareBanner from "./adsSquareBanner.component";

const AdsHorizontalBanner = () => {
  return (
    <div className="relative w-full mx-auto inline-flex justify-center py-4 px-4 sm:px-6 lg:px-8">
      <>
        <iframe
          className="hidden md:block"
          style={{ backgroundColor: "#02060e" }}
          width="900"
          height="250"
          allowTransparency={true}
          name="spot_id_10006954"
          src={`//a.adtng.com/get/10006954?ata=${AdsAda}`}
        ></iframe>
        <iframe
          className="hidden sm:block md:hidden"
          style={{ backgroundColor: "#02060e" }}
          width="728"
          height="90"
          allowTransparency={true}
          name="spot_id_10002481"
          src={`//a.adtng.com/get/10002481?ata=${AdsAda}`}
        ></iframe>
        <div className="block sm:hidden">
          <AdsSquareBanner />
        </div>
      </>
    </div>
  );
};

export default AdsHorizontalBanner;
