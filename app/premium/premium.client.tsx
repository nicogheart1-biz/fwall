"use client";

import { useState, useEffect } from "react";
import { TabGroup } from "@/components";
import { usePremium } from "@/src/hooks/usePremium";
import PremiumStatus from "@/components/premium/premiumStatus.component";
import PremiumCheckout from "@/components/premium/premiumCheckout.component";
import VoucherAccess from "@/components/premium/voucherAccess.component";
import PremiumVideoCard from "@/components/card/premiumVideoCard.component";
import { PremiumService } from "@/src/services/premium.service";
import { PremiumVideoI } from "@/src/types/premium.types";
import { LoaderSpinner } from "@/components";
import { StarIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { PremiumConstants } from "@/src/constants/premium.constants";

const PremiumPageClient = () => {
  const { hasAccess, isLoading: premiumLoading } = usePremium();
  const [activeTab, setActiveTab] = useState("preview");
  const [premiumVideos, setPremiumVideos] = useState<PremiumVideoI[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(false);
  const [showVoucherSuccess, setShowVoucherSuccess] = useState(false);

  useEffect(() => {
    const fetchPremiumVideos = async () => {
      setIsLoadingVideos(true);
      try {
        const response = await PremiumService.getPremiumVideos();
        if (response.success) {
          setPremiumVideos(response.videos.slice(0, 6));
        }
      } catch (error) {
        console.error("Errore nel caricamento dei video premium:", error);
      } finally {
        setIsLoadingVideos(false);
      }
    };

    fetchPremiumVideos();
  }, []);

  const tabs = [
    { label: "Preview", active: activeTab === "preview" },
    { label: "Buy Daily Access", active: activeTab === "purchase" },
  ];

  const handleTabChange = (tab: any) => {
    setActiveTab(tab.label === "Preview" ? "preview" : "purchase");
  };

  const handlePurchaseSuccess = (voucherCode: string) => {
    setShowVoucherSuccess(true);
    setActiveTab("preview");
  };

  const handleVoucherSuccess = () => {
    setShowVoucherSuccess(true);
  };

  if (premiumLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoaderSpinner size="big" />
      </div>
    );
  }

  if (hasAccess) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <PremiumStatus />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Status */}
      {showVoucherSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <StarIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Premium Access Activated!
          </h3>
          <p className="text-green-700 mb-4">
            Now you can enjoy all premium contents for the next 24 hours.
          </p>
          <a
            href="/premium/access"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white-100 rounded-md hover:bg-green-700 transition"
          >
            Go to Premium Videos
          </a>
        </div>
      )}

      {/* Tabs */}
      <TabGroup tabs={tabs} onTabChange={handleTabChange} />

      {/* Content */}
      {activeTab === "preview" && (
        <div className="space-y-8">
          {/* Anteprima Video */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <LockClosedIcon className="h-6 w-6 text-secondary-700" />
              <h2 className="text-2xl font-bold text-secondary-700">
                Premium Contents Preview
              </h2>
            </div>

            {isLoadingVideos ? (
              <div className="flex justify-center py-12">
                <LoaderSpinner />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {premiumVideos.map((video) => (
                  <PremiumVideoCard
                    key={video.id}
                    video={video}
                    blur={true}
                  />
                ))}
              </div>
            )}

            <div className="text-center mt-8">
              <p className="text-gray-300 mb-4">
                These are just some of our exclusive premium contents.
              </p>
              <button
                onClick={() => setActiveTab("purchase")}
                className="inline-flex items-center px-6 py-3 bg-secondary-600 text-white-100 rounded-lg hover:bg-secondary-700 transition"
              >
                <StarIcon className="h-5 w-5 mr-2" />
                Buy Daily Access
              </button>
            </div>
          </div>

          {/* Vantaggi */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-primary-700 mb-6 text-center">
              Why choose Premium?
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <StarIcon className="h-5 w-5 text-secondary-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-primary-500">Exclusive Contents</h4>
                    <p className="text-sm text-gray-600">High Quality Premium Videos not available for free</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <StarIcon className="h-5 w-5 text-secondary-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-primary-500">Instant Access</h4>
                    <p className="text-sm text-gray-600">Instant activation after payment</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <StarIcon className="h-5 w-5 text-secondary-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-primary-500">Completely Anonymous</h4>
                    <p className="text-sm text-gray-600">No registration or personal data required</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <StarIcon className="h-5 w-5 text-secondary-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-primary-500">Great Price</h4>
                    <p className="text-sm text-gray-600"><strong className="text-secondary-500">Only ${PremiumConstants.DAILY_ACCESS_PRICE / 100}</strong> for 24 hours of unlimited access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "purchase" && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout */}
          <PremiumCheckout onSuccess={handlePurchaseSuccess} />
          
          {/* Voucher Access */}
          <VoucherAccess onSuccess={handleVoucherSuccess} />
        </div>
      )}
    </div>
  );
};

export default PremiumPageClient;
