import { Routes } from "@/src/routes";
import { RouteI } from "@/src/types/route.types";

const getFooterMenu = (privateRoutes: boolean = false) => {
  return Object.values(Routes)
    .filter(({ menu }) => menu?.footer)
    .filter(({ private: isPrivate }) =>
      privateRoutes ? isPrivate : !isPrivate
    );
};

const getHeaderMenu = (privateRoutes: boolean = false) => {
  return Object.values(Routes)
    .filter(({ menu }) => menu?.header)
    .filter(({ private: isPrivate }) =>
      privateRoutes ? isPrivate : !isPrivate
    );
};

const getRouteByUrl = (matchingUrl: RouteI["url"]) =>
  Object.values(Routes).find(({ url }) => url === matchingUrl);

export const NavigationUtils = { getFooterMenu, getHeaderMenu, getRouteByUrl };
