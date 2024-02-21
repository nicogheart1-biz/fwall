import { MetadataRoute } from "next";
import Routes from "@/src/assets/routes-en.json";
import { AppConstants } from "@/src/constants";

const forcedRoutes: MetadataRoute.Sitemap = [
  {
    url: `${AppConstants.hostUrl}${Routes.home.url}`,
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 1,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = Object.values(Routes).map((route) => ({
    url: `${AppConstants.hostUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...forcedRoutes, ...routes].filter(
    (value, index, self) => index === self.findIndex((t) => t.url === value.url)
  );
}
