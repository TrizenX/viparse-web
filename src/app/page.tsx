import { Benchmark } from "@/components/sections/benchmark"
import { Faq } from "@/components/sections/faq"
import { Features } from "@/components/sections/features"
import { Hero } from "@/components/sections/hero"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Playground } from "@/components/sections/playground"
import { Problem } from "@/components/sections/problem"
import { Quickstart } from "@/components/sections/quickstart"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top" className="mx-auto w-full max-w-[1100px] flex-1 px-6">
        <Hero />
        <Separator />
        <Problem />
        <HowItWorks />
        <Features />
        <Quickstart />
        <Playground />
        <Benchmark />
        <Faq />
      </main>

      <SiteFooter />
    </>
  )
}
