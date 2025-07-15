"use client";

import { usePremium } from "@/src/hooks/usePremium";
import { LoaderSpinner } from "@/components";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type PremiumGuardI = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirect?: boolean;
};

const PremiumGuard = (props: PremiumGuardI) => {
  const { children, fallback, redirect = true } = props;
  const { hasAccess, isLoading } = usePremium();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !hasAccess && redirect) {
      router.push('/premium');
    }
  }, [isLoading, hasAccess, redirect, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoaderSpinner size="big" />
      </div>
    );
  }

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="text-center py-12">
        <ExclamationTriangleIcon className="h-16 w-16 text-secondary-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Accesso Premium Richiesto
        </h2>
        <p className="text-gray-600 mb-6">
          Hai bisogno di un accesso premium valido per visualizzare questo contenuto.
        </p>
        <a
          href="/premium"
          className="inline-flex items-center px-6 py-3 bg-secondary-600 text-white-100 rounded-lg hover:bg-secondary-700 transition"
        >
          Acquista accesso premium
        </a>
      </div>
    );
  }

  return <>{children}</>;
};

export default PremiumGuard;
