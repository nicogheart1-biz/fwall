"use client";
import { AdsBlockTypeEnum } from "@/src/enums/ads.enums";
import AdsBlock from "./adsBlock.component";

type AdsColumnI = {
  position?: "left" | "right";
};

const AdsColumn = (props: AdsColumnI) => {
  const { position = "left" } = props;
  return (
    <div
      className="hidden 2xl:block fixed top-1/2"
      style={{
        transform: "translateY(-50%)",
        left:
          position === "left" ? "calc(((100vw - 1380px - 160px) / 2) / 2)" : "",
        right:
          position === "right"
            ? "calc(((100vw - 1380px - 160px) / 2) / 2)"
            : "",
      }}
    >
      <AdsBlock type={AdsBlockTypeEnum.VERTICAL} />
    </div>
  );
};

export default AdsColumn;
