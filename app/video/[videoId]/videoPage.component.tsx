"use client";
import { ButtonLink } from "@/components";
import AdsBlock from "@/components/ads/adsBlock.component";
import { AdsBlockTypeEnum } from "@/src/enums/ads.enums";
import { AnalyticsEventEnum } from "@/src/enums/analytics.enums";
import { VideoI } from "@/src/types/videoProvider.types";
import { AnalyticsUtils } from "@/src/utils/analytics.utils";
import { capitalize } from "@/src/utils/common.utils";

type VideoPageComponentI = {
  videoDetails: VideoI;
};

const VideoPageComponent = (props: VideoPageComponentI) => {
  const { videoDetails } = props;
  return (
    <>
      <div className="w-full flex flex-row flex-wrap md:flex-nowrap">
        <div className="w-full md:basis-3/4">
          <h2 className="pb-2 text-lg font-medium">
            {capitalize(videoDetails.title)}
          </h2>
          {videoDetails.embedUrl ? (
            <iframe
              className="h-64 sm:h-96 md:h-144 w-full"
              style={{ backgroundColor: "#02060e" }}
              name={`video-${videoDetails.provider}-${videoDetails.id}`}
              width="100%"
              height="auto"
              src={videoDetails.embedUrl}
            />
          ) : (
            <span
              onClick={() => {
                AnalyticsUtils.logEvent(AnalyticsEventEnum.GO_TO_VIDEO, {
                  provider: videoDetails.provider,
                  id: videoDetails.id,
                });
              }}
            >
              <ButtonLink
                primary
                label="Continue to video"
                href={videoDetails.url}
              />
            </span>
          )}
        </div>
        <div className="hidden md:block md:basis-1/4">
          <AdsBlock type={AdsBlockTypeEnum.SQUARE} />
          <AdsBlock type={AdsBlockTypeEnum.SQUARE} />
        </div>
      </div>
    </>
  );
};

export default VideoPageComponent;
