/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import {
  ChartBarIcon,
  ClockIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { Routes } from "@/src/routes";
import clsx from "clsx";

/*const VideoCardOverlay = dynamic(() => import("./videoCardOverlay.component"), {
  ssr: false,
});*/

const VideoCardPreview = dynamic(() => import("./videoCardPreview.component"), {
  ssr: false,
});

type VideoCardI = {
  id: string;
  cover: string;
  length?: string;
  provider: string;
  rate?: string;
  title: string;
  thumbs?: string[];
  url: string;
  views?: string;
};

const VideoCard = (props: VideoCardI) => {
  const {
    cover,
    id,
    length,
    provider,
    rate,
    title,
    thumbs = [],
    url,
    views,
  } = props;

  //console.log('props', props)
  return (
    <Link
      href={`${Routes.contentRedirect.url}${encodeURIComponent(url)}`}
      target="_blank"
      className="flex flex-col justify-between gap-2"
    >
      <div className="relative p-2 bg-background-500/10 overflow-hidden rounded transition text-white-500 hover:bg-background-500/25 hover:text-white-100">
        {/*<VideoCardOverlay />*/}
        <div className="flex flex-col justify-between gap-2">
          <div className="relative mx-auto w-full">
            {cover ? (
              <img
                className="h-48 object-fill"
                alt="video-preview"
                src={cover}
                width={560}
                height={320}
                loading="lazy"
                //priority={false}
              />
            ) : null}
            {thumbs?.length ? (
              <VideoCardPreview id={id} thumbs={thumbs} />
            ) : null}
            {provider ? (
              <span className="absolute top-1 right-1 z-40">
                <Image
                  className="h-4 w-4"
                  alt={provider}
                  src={require(`@/src/assets/videoProviders/logos/${provider}.png`)}
                  priority={false}
                />
              </span>
            ) : null}
            {length ? (
              <span
                className={clsx(
                  "text-xs items-center inline-flex gap-1 text-white-500",
                  "absolute bottom-1 right-1 bg-background-500/75 p-1 rounded z-40"
                )}
              >
                <ClockIcon className="h-4 w-4 text-secondary-500" />
                {length}
              </span>
            ) : null}
          </div>
          <div
            className={clsx(
              "capitalize text-ellipsis overflow-hidden",
              "sm:h-12",
              //"whitespace-nowrap text-nowrap"
            )}
          >
            {title}
          </div>

          {/*<div className="w-full mt-2 flex gap-4 items-center justify-end">
            {views ? (
              <span className="hidden md:inline-flex text-xs items-center gap-1">
                <PlayCircleIcon className="h-4 w-4 text-secondary-500" />
                {views}
              </span>
            ) : null}
            {rate ? (
              <span className="hidden md:inline-flex text-xs items-center gap-1">
                <ChartBarIcon className="h-4 w-4 text-secondary-500" />
                {rate}
              </span>
            ) : null}
            {provider ? (
              <Image
                className="h-4 w-4"
                alt={provider}
                src={require(`@/src/assets/videoProviders/logos/${provider}.png`)}
                priority={false}
              />
            ) : null}
          </div>*/}
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
