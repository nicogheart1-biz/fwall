import { Routes } from "@/src/routes";
import { RouteI } from "@/src/types/route.types";

const getFooterMenu = (privateRoutes: boolean = false) => {
  return Object.values(Routes)
    .filter(({ menu }) => menu?.footer)
    .filter(({ private: isPrivate }) =>
      privateRoutes ? isPrivate : !isPrivate
    )
    .sort((a, b) => {
      if (a?.menu?.order && b?.menu?.order) {
        return a.menu.order - b.menu.order;
      }
      if (a?.menu?.order) return -1; // a has order, b does not
      if (b?.menu?.order) return 1; // b has order, a does not
      return 0; // neither has order, maintain original order
    });
};

const getHeaderMenu = (privateRoutes: boolean = false) => {
  return Object.values(Routes)
    .filter(({ menu }) => menu?.header)
    .filter(({ private: isPrivate }) =>
      privateRoutes ? isPrivate : !isPrivate
    )
    .sort((a, b) => {
      if (a?.menu?.order && b?.menu?.order) {
        return a.menu.order - b.menu.order;
      }
      if (a?.menu?.order) return -1; // a has order, b does not
      if (b?.menu?.order) return 1; // b has order, a does not
      return 0; // neither has order, maintain original order
    });
};

const getRouteByUrl = (matchingUrl: RouteI["url"]) =>
  Object.values(Routes).find(({ url }) => url === matchingUrl);

export const NavigationUtils = { getFooterMenu, getHeaderMenu, getRouteByUrl };
