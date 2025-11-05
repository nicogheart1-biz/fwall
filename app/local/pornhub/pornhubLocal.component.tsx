"use client";

import { VideoProvidersUtils } from "@/src/utils/videoProviders.utils";

const PornhubLocal = (props: { title?: string; contents: any }) => {
  console.log("contents", {
    videos: VideoProvidersUtils.randomSort(
      props.contents.map((item: any) => ({
        ...item,
        categories: undefined,
        pornstars: undefined,
        segment: undefined,
        tags: undefined,
        vote: undefined,
      }))
    ),
  });

  return (
    <div>
      <button
        style={{ padding: 16, backgroundColor: "white", color: "black" }}
        onClick={() =>
          navigator.clipboard.writeText(JSON.stringify(props.contents))
        }
      >
        COPIA {props.title?.toUpperCase() || ""}
      </button>
    </div>
  );
};

export default PornhubLocal;
