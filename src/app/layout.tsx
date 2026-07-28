import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { StructuredData } from "@/components/structured-data"
import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig } from "@/lib/site"

import "./globals.css"

// Self-hosted Geist rather than next/font/google: the Google-hosted build is
// split into subsets and Next's font data has no `vietnamese` entry for it, so
// every ế/ị/ườ on the page would drop to a fallback face.

// Legacy Vietnamese mojibake leans on Latin-1 glyphs; JetBrains Mono renders
// them the way a pre-Unicode document actually looks.
const legacyMono = JetBrains_Mono({
  variable: "--font-legacy-mono",
  subsets: ["latin", "latin-ext"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  keywords: [
    "vietnamese",
    "tcvn3",
    "vni",
    "viscii",
    "unicode",
    "nfc",
    "rag",
    "document parsing",
    "python",
  ],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${legacyMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <StructuredData />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
