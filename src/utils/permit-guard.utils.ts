import { RouteI } from "@/src/types/route.types";

const isAuthorized = (route: RouteI) => {
  const { private: isPrivate } = route;

  let valid = true;

  if (isPrivate) {
    // checking private routes & authentication
    valid = false;
  }

  // TODO other check

  return valid;
};

export const PermitGuardUtils = { isAuthorized };
