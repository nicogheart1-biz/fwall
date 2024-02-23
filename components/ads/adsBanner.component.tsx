"use client";

import { isReleased } from "@/src/utils/envs.utils";

const AdsBanner = () => {
  return (
    <div className="relative w-full mx-auto max-w-screen-xl inline-flex justify-center py-4 px-4 sm:px-6 lg:px-8">
      {isReleased ? (
        <iframe
          style={{ backgroundColor: "white" }}
          width="900"
          height="250"
          allowTransparency={true}
          name="spot_id_10006954"
          src="//a.adtng.com/get/10006954?ata=gheart"
        ></iframe>
      ) : null}
    </div>
  );
};

export default AdsBanner;
