import Image from "next/image";
import Link from "next/link";
import {
  ChartBarIcon,
  ClockIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";

const VideoCardOverlay = dynamic(() => import("./videoCardOverlay.component"), {
  ssr: false,
});
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
  const { cover, id, length, provider, rate, title, thumbs = [], url, views } = props;

  //console.log('props', props)
  return (
    <Link
      href={url}
      target="_blank"
      className="flex flex-col justify-between gap-2"
    >
      <div className="relative p-2 bg-background-100/10 overflow-hidden rounded transition hover:bg-background-100/25">
        <VideoCardOverlay />
        <div className="flex flex-col justify-between gap-2">
          <div className="relative mx-auto w-full">
            <Image
              className="h-32 object-cover"
              alt="video-preview"
              src={cover}
              width={560}
              height={320}
              priority={false}
            />
            {thumbs?.length ? <VideoCardPreview id={id} thumbs={thumbs} /> : null}
          </div>
          <div className="capitalize text-ellipsis overflow-hidden text-nowrap">
            {title}
          </div>

          <div className="w-full mt-2 flex gap-4 items-center justify-end">
            {views ? (
              <span className="text-xs items-center inline-flex gap-1">
                <PlayCircleIcon className="h-4 w-4 text-secondary-500" />
                {views}
              </span>
            ) : null}
            {length ? (
              <span className="text-xs items-center inline-flex gap-1">
                <ClockIcon className="h-4 w-4 text-secondary-500" />
                {length}
              </span>
            ) : null}
            {rate ? (
              <span className="text-xs items-center inline-flex gap-1">
                <ChartBarIcon className="h-4 w-4 text-secondary-500" />
                {rate}
              </span>
            ) : null}
            <Image
              className="h-4 w-4"
              alt={provider}
              src={require(`@/src/assets/videoProviders/logos/${provider}.png`)}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
