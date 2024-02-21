"use client";

import { Routes } from "@/src/routes";
import { NavigationUtils } from "@/src/utils/navigation.utils";
import { PermitGuardUtils } from "@/src/utils/permit-guard.utils";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PermitGuardComponent = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const route = NavigationUtils.getRouteByUrl(pathname);
    if (route && !PermitGuardUtils.isAuthorized(route)) {
      console.error("Not authorized, redirecting..");
      router.replace(Routes.home.url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
};

export default PermitGuardComponent;
