import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/site"

// A single-page site: only "/" is a real URL. The in-page anchors
// (#quickstart, #playground, #benchmark) are not separate documents and would
// be treated as duplicates if listed here.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ]
}
