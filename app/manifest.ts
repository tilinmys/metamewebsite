import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Meta Me — a My Stree program",
    short_name: "Meta Me",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FCF4D9",
    theme_color: "#FCF4D9",
    lang: "en-IN",
    categories: ["health", "medical", "lifestyle"],
  };
}
