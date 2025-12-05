"use client";

import { usePremium } from "@/src/hooks/usePremium";
import { Routes } from "@/src/routes";
import { StarIcon, ClockIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const PremiumHeader = () => {
  const { hasAccess, formatTimeRemaining } = usePremium();

  if (!hasAccess) return null;

  return (
    <div className="w-full inline-flex items-center justify-center">
      <Link
        href={Routes.premiumAccess.url}
        className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-secondary-900 to-secondary-700 text-secondary-100 rounded-full text-xs font-medium hover:from-secondary-700 hover:to-secondary-500 transition animate-bounce"
      >
        <div className="inline-flex items-center gap-1">
          <StarIcon className="size-4" />
          <span>Premium</span>
        </div>
        <div className="inline-flex items-center gap-1 text-primary-600">
          <ClockIcon className="size-3" />
          <span>{formatTimeRemaining()}</span>
        </div>
      </Link>
    </div>
  );
};

export default PremiumHeader;
