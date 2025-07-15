"use client";

import { usePremium } from "@/src/hooks/usePremium";
import { StarIcon, ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const PremiumHeader = () => {
  const { hasAccess, formatTimeRemaining } = usePremium();

  if (!hasAccess) return null;

  return (
    <Link
      href="/premium/access"
      className="hidden lg:flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white-100 rounded-full text-xs font-medium hover:from-secondary-600 hover:to-secondary-700 transition"
    >
      <StarIcon className="h-4 w-4" />
      <span>Premium</span>
      <div className="flex items-center gap-1 text-secondary-100">
        <ClockIcon className="h-3 w-3" />
        <span>{formatTimeRemaining()}</span>
      </div>
    </Link>
  );
};

export default PremiumHeader;
