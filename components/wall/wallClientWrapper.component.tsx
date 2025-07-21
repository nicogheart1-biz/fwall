'use client';

import dynamic from "next/dynamic";

const WallClient = dynamic(() => import("./wallClient.component"), {
  ssr: false,
});

type WallClientWrapperProps = {
  contents?: { [videoProvider: string]: any };
  page?: string;
  title?: string;
  videoProviders?: {[videoProvider: string]: any};
  videos: any[];
};

export default function WallClientWrapper(props: WallClientWrapperProps) {
  return <WallClient {...props} />;
}
