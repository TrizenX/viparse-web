import { FAQ } from "@/lib/content"
import { siteConfig } from "@/lib/site"

/**
 * JSON-LD for the landing page.
 *
 * Two graphs, both describing things actually on the page:
 * - SoftwareApplication — what the product is, so search engines can show the
 *   free/open-source signals rather than inferring them;
 * - FAQPage — mirrors the FAQ accordion verbatim. Google requires the answer
 *   text to be visible on the page, which it is (the accordion only collapses
 *   it, it stays in the DOM).
 */
export function StructuredData() {
  const graph = [
    {
      "@type": "SoftwareApplication",
      "@id": `${siteConfig.url}#software`,
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteConfig.url,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Linux, macOS, Windows",
      softwareVersion: siteConfig.version.replace(/^v/, ""),
      programmingLanguage: "Python",
      license: "https://opensource.org/licenses/MIT",
      codeRepository: siteConfig.links.github,
      downloadUrl: siteConfig.links.pypi,
      author: {
        "@type": "Person",
        "@id": siteConfig.author.id,
        name: siteConfig.author.name,
        alternateName: siteConfig.author.alternateName,
        url: siteConfig.author.url,
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.url}#faq`,
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ]

  return (
    <script
      type="application/ld+json"
      // The payload is built from local constants, never user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  )
}
