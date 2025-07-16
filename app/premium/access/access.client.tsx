"use client";

import { useState, useEffect } from "react";
import { usePremium } from "@/src/hooks/usePremium";
import { PremiumService } from "@/src/services/premium.service";
import { PremiumVideoI } from "@/src/types/premium.types";
import { LoaderSpinner } from "@/components";
import PremiumVideoCard from "@/components/card/premiumVideoCard.component";
import PremiumGuard from "@/components/premium/premiumGuard.component";
import {
  StarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { Routes } from "@/src/routes";
import Link from "next/link";

const PremiumAccessClient = () => {
  const { hasAccess, formatTimeRemaining } = usePremium();
  const [premiumVideos, setPremiumVideos] = useState<PremiumVideoI[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carica i video premium se ha accesso
  useEffect(() => {
    if (hasAccess) {
      const fetchPremiumVideos = async () => {
        setIsLoadingVideos(true);
        setError(null);
        try {
          const response = await PremiumService.getPremiumVideos();
          if (response.success) {
            setPremiumVideos(response.videos);
          } else {
            setError("Errore nel caricamento dei video premium");
          }
        } catch (error) {
          console.error("Errore nel caricamento dei video premium:", error);
          setError("Errore nel caricamento dei video premium");
        } finally {
          setIsLoadingVideos(false);
        }
      };

      fetchPremiumVideos();
    }
  }, [hasAccess]);

  const PremiumContent = () => (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header con status */}
      <div className="border-2 border-primary-500 bg-gradient-to-r from-secondary-700 to-secondary-900 rounded-lg p-6 shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-700 rounded-full">
              <StarIcon className="size-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-700">
                Premium Area
              </h1>
              <p className="text-primary-600">
                Welcome to the exclusive premium content area!
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-secondary-100 mb-1">
              <ClockIcon className="size-4" />
              <span className="text-sm font-medium">Time remaining</span>
            </div>
            <p className="text-lg font-bold text-primary-900">
              {formatTimeRemaining()}
            </p>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-secondary-500">
            Exclusive Premium Videos
          </h2>
          <span className="text-sm text-gray-500">
            {premiumVideos.length} available videos
          </span>
        </div>

        {isLoadingVideos ? (
          <div className="flex justify-center py-12">
            <LoaderSpinner />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error loading videos
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-secondary-600 text-white-100 rounded-lg hover:bg-secondary-700 transition"
            >
              Try again
            </button>
          </div>
        ) : premiumVideos.length === 0 ? (
          <div className="text-center py-12">
            <StarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No premium videos available
            </h3>
            <p className="text-gray-600">
              There are currently no premium videos available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {premiumVideos.map((video) => (
              <PremiumVideoCard key={video.id} video={video} blur={false} />
            ))}
          </div>
        )}
      </div>

      {/* Info sidebar */}
      <div className="bg-primary-100 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-primary-900 mb-4">
          Access Information
        </h3>
        <div className="space-y-3 text-sm text-primary-600">
          <p>
            • Your access is valid for 24 hours from the moment of purchase.
          </p>
          <p>• You can view unlimited videos</p>
          <p>• We guarantee 100% anonymous access</p>
          <p>• After 24h you have to buy a new Daily pass</p>
        </div>

        <div className="mt-6 pt-4 border-t border-primary-200">
          <div className="text-center space-y-6">
            <div className="text-sm font-medium text-primary-700">
              Do you want to extend your access?
            </div>
            <div>
              <Link
                href={Routes.premium.url}
                className="rounded-lg p-4 bg-primary-500 text-sm text-secondary-500 hover:bg-primary-700 hover:text-secondary-700 font-medium transition"
              >
                Buy more time
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PremiumGuard>
      <PremiumContent />
    </PremiumGuard>
  );
};

export default PremiumAccessClient;
