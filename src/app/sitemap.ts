import type { MetadataRoute } from "next"

import { siteConfig } from "@/lib/site"

// Two real URLs: the English page and the Vietnamese one. The in-page anchors
// (#quickstart, #playground, #benchmark) are not separate documents and would
// be treated as duplicates if listed here.
//
// `/vi` is not a translation of `/` — it argues differently for a different reader —
// but they are the same content in two languages as far as a crawler is concerned, so
// each declares the other through `alternates.languages` in its metadata.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/vi`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]
}
