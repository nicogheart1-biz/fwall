"use client";

import { VideoProvidersUtils } from "@/src/utils/videoProviders.utils";

const PornhubLocal = (props: { contents: any }) => {
  console.log(
    "contents",
    VideoProvidersUtils.randomSort(
      props.contents.map((item: any) => ({
        ...item,
        categories: undefined,
        pornstars: undefined,
        segment: undefined,
        tags: undefined,
        vote: undefined,
      }))
    )
  );

  return null;
};

export default PornhubLocal;
