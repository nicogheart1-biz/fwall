"use client";

import { usePremium } from "@/src/hooks/usePremium";
import { Button, ButtonLink } from "@/components";
import { StarIcon, ClockIcon } from "@heroicons/react/24/solid";
import { Routes } from "@/src/routes";

type PremiumStatusI = {
  onUpgrade?: () => void;
};

const PremiumStatus = (props: PremiumStatusI) => {
  const { onUpgrade } = props;
  const { hasAccess, formatTimeRemaining, clearAccess } =
    usePremium();

  if (hasAccess) {
    return (
      <div className="border-2 border-primary-500 bg-gradient-to-r from-secondary-700 to-secondary-900 rounded-lg p-6 shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary-200 rounded-full">
            <StarIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary-700">
              Premium Access Active
            </h3>
            <p className="text-sm text-primary-600">
              Welcome to the exclusive area!
            </p>
          </div>
        </div>

        <div className="bg-white-100/50 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <ClockIcon className="h-4 w-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">
              Remaining Time
            </span>
          </div>
          <p className="text-lg font-bold text-primary-900">
            {formatTimeRemaining()}
          </p>
        </div>

        <div>
          <ButtonLink
            primary
            label="Go to premium videos"
            href={Routes.premiumAccess.url}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3">
          <StarIcon className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          You are not a premium member
        </h3>
        <p className="text-sm text-gray-600">
          Buy daily access to view exclusive video contents
        </p>
      </div>

      <Button primary full label="Buy Daily Access" action={onUpgrade} />
    </div>
  );
};

export default PremiumStatus;
