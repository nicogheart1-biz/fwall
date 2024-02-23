"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";
import { useEffect, useState } from "react";

type VideoCardPreviewI = {
  id: string;
  thumbs?: string[];
};

const autoplayConfig = {
  delay: 500,
  disableOnInteraction: false,
};

const VideoCardPreview = (props: VideoCardPreviewI) => {
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
              <Image
                className="h-32 object-cover"
                alt={`video-preview-${i}`}
                src={thumb}
                width={560}
                height={320}
                priority={false}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </div>
  );
};

export default VideoCardPreview;
