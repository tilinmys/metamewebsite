import type { MetadataRoute } from "next";
import { CANONICAL } from "@/lib/site";

/** Meta Me is a single-page experience — one canonical URL. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: CANONICAL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
