/* eslint-disable @next/next/no-img-element */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { useEffect, useState } from "react";
import { VideoI } from "@/src/types/videoProvider.types";

const autoplayConfig = {
  delay: 500,
  disableOnInteraction: false,
};

const VideoCardPreview = (props: VideoI) => {
  const { id, thumbs = [] } = props;
  const [autoplay, setAutoplay] = useState(false);

  const startAutoplay = () => {
    setAutoplay(true);
  };

  const stopAutoplay = () => {
    setAutoplay(false);
  };

  useEffect(() => {
    return () => {
      stopAutoplay();
    };
  }, []);

  return (
    <div
      className="absolute w-full h-full bg-transparent top-0 left-0"
      onMouseOver={startAutoplay}
      onMouseLeave={stopAutoplay}
      onTouchStart={startAutoplay}
      onTouchEnd={stopAutoplay}
    >
      {autoplay && thumbs?.length ? (
        <Swiper
          effect="fade"
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={autoplayConfig}
          modules={[Autoplay, EffectFade]}
        >
          {thumbs.map((thumb, i) => (
            <SwiperSlide key={`${id}-${i}`}>
              <img
                className="h-48 object-fill"
                alt={`video-preview-${i}`}
                src={thumb}
                width={560}
                height={320}
                loading="lazy"
                //priority={false}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </div>
  );
};

export default VideoCardPreview;
