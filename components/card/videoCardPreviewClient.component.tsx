'use client';

import dynamic from "next/dynamic";
import { VideoI } from "@/src/types/videoProvider.types";

const VideoCardPreview = dynamic(() => import("./videoCardPreview.component"), {
  ssr: false,
});

type VideoCardPreviewClientProps = VideoI & {
  page?: string;
};

export default function VideoCardPreviewClient(props: VideoCardPreviewClientProps) {
  return <VideoCardPreview {...props} />;
}
