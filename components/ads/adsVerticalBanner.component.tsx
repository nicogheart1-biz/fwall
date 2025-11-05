"use client";
import { AdsAda } from "@/src/constants/ads.constants";

const AdsVerticalBanner = () => {
  return (
    <div className="relative w-40">
      <iframe
        style={{ backgroundColor: "#02060e" }}
        width="160"
        height="600"
        // @ts-ignore
        allowtransparency="true"
        name="spot_id_10002485"
        src={`//a.adtng.com/get/10002485?ata=${AdsAda}`}
      ></iframe>
    </div>
  );
};

export default AdsVerticalBanner;
