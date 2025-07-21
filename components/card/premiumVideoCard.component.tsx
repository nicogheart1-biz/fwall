"use client";

import { PremiumVideoI } from "@/src/types/premium.types";
import Image from "next/image";
import Link from "next/link";
import {
  ClockIcon,
  LockClosedIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Routes } from "@/src/routes";
import { universalBtoa } from "@/src/utils/common.utils";

type PremiumVideoCardI = {
  video: PremiumVideoI;
  blur?: boolean;
};

const PremiumVideoCard = (props: PremiumVideoCardI) => {
  const { video, blur = false } = props;
  const { id, title, cover, duration, provider } = video;

  return (
    <div className="group relative block overflow-hidden rounded-lg bg-white-100 shadow-sm transition-transform hover:scale-105">
      <div className="relative">
        <Image
          alt={title}
          src={cover}
          width={300}
          height={200}
          className={clsx(
            "h-48 w-full object-cover transition duration-500 group-hover:scale-105",
            blur ? "blur-xs" : ""
          )}
          priority={false}
        />

        {/* Overlay Premium */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badge Premium */}
        <div className="absolute top-2 left-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary-500 px-2 py-1 text-xs font-semibold text-white-100">
            <StarIcon className="size-3" />
            PREMIUM
          </span>
        </div>

        {/* Durata */}
        {duration && (
          <div className="absolute bottom-2 right-2">
            <span className="inline-flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-xs text-white-100">
              <ClockIcon className="size-3" />
              {duration}
            </span>
          </div>
        )}

        {/* Blur overlay se necessario */}
        {blur && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="text-center">
              <LockClosedIcon className="mx-auto h-8 w-8 text-secondary-300 mb-2" />
              <p className="text-white-100 text-sm font-medium">
                Premium Content
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {title}
        </h3>

        {provider && (
          <div className="mt-2 flex items-center gap-2">
            <Image
              className="h-4 w-4"
              alt={provider}
              height={16}
              width={16}
              src={`/videoProviders/logos/${provider}.png`}
              //   priority={false}
              loading="lazy"
            />
            <span className="text-xs text-gray-500">{provider}</span>
          </div>
        )}
      </div>

      {!blur && (
        <Link
          href={`${Routes.premiumAccessVideo.url}${encodeURIComponent(
            universalBtoa(`${provider};${id}`)
          )}`}
          target="_blank"
          className="absolute inset-0"
          aria-label={`Watch ${title}`}
        />
      )}
    </div>
  );
};

export default PremiumVideoCard;
