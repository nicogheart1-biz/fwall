"use client";
import { Button, ButtonLink, Logo } from "@/components";
import AdsBlock from "@/components/ads/adsBlock.component";
import { AdsBlockTypeEnum } from "@/src/enums/ads.enums";
import { AnalyticsEventEnum } from "@/src/enums/analytics.enums";
import { VideoI } from "@/src/types/videoProvider.types";
import { AnalyticsUtils } from "@/src/utils/analytics.utils";
import { capitalize } from "@/src/utils/common.utils";
import clsx from "clsx";
import { useEffect, useState } from "react";

type VideoPageComponentI = {
  videoDetails: VideoI;
  premium?: boolean;
};

const VideoPageComponent = (props: VideoPageComponentI) => {
  const { videoDetails, premium = false } = props;
  const [showAdvBlock, setShowAdvBlock] = useState(!premium);

  useEffect(() => {
    setShowAdvBlock(!premium);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [premium]);

  return (
    <>
      <div className="w-full flex flex-row flex-wrap md:flex-nowrap">
        <div
          className={clsx(
            "w-full md:basis-3/4",
            !showAdvBlock && "md:!basis-full"
          )}
        >
          <h2 className="pb-2 text-lg font-medium">
            {capitalize(videoDetails.title)}
          </h2>
          {videoDetails.embedUrl ? (
            <div className="relative w-full">
              <iframe
                className="h-64 sm:h-96 md:h-144 w-full"
                style={{ backgroundColor: "#02060e" }}
                name={`video-${videoDetails.provider}-${videoDetails.id}`}
                width="100%"
                height="auto"
                src={videoDetails.embedUrl}
              />
              {showAdvBlock ? (
                <div className="absolute top-0 left-0 w-full h-full inline-flex items-center justify-center bg-background-900/50 z-40">
                  <div className="bg-background-900/75 sm:bg-transparent inline-flex flex-wrap justify-center">
                    <AdsBlock type={AdsBlockTypeEnum.SQUARE} />
                    <Button
                      label="Close & Play"
                      action={() => setShowAdvBlock(false)}
                      analyticEvent={{
                        event: AnalyticsEventEnum.CLOSE_AND_PLAY,
                        payload: {
                          id: videoDetails.id,
                          provider: videoDetails.provider,
                          embedUrl: videoDetails.embedUrl,
                          length: videoDetails.length || "-",
                          rate: videoDetails.rate || "-",
                          title: videoDetails.title,
                          url: videoDetails.url,
                          views: videoDetails.views || "-",
                        },
                      }}
                    />
                  </div>
                </div>
              ) : premium ? (
                <div className="absolute top-3 right-0 size-20 bg-transparent z-10 pointer-events-auto">
                  <span className="size-16 bg-primary-500 rounded-full p-3 inline-flex items-center justify-center">
                    <Logo size="small" />
                  </span>
                </div>
              ) : null}
            </div>
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
        {showAdvBlock ? (
          <div className="hidden md:block md:basis-1/4">
            <AdsBlock type={AdsBlockTypeEnum.SQUARE} />
            <AdsBlock type={AdsBlockTypeEnum.SQUARE} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default VideoPageComponent;
