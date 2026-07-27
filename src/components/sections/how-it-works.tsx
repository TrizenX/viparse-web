import { Section, SectionHeader } from "@/components/section"
import { Card, CardContent } from "@/components/ui/card"
import { STEPS } from "@/lib/content"

export function HowItWorks() {
  return (
    <Section>
      <SectionHeader eyebrow="How it works" title="Three steps, one call." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((step) => (
          <Card
            key={step.number}
            className="transition-[box-shadow,border-color] duration-150 hover:border-foreground/20 hover:shadow-[0_1px_3px_rgba(0,0,0,0.07)]"
          >
            <CardContent className="grid content-start gap-2.5">
              <span className="font-mono text-[11px] text-brand">
                {step.number}
              </span>
              <h3 className="text-[16px] font-semibold tracking-[-0.015em]">
                {step.title}
              </h3>
              <p className="text-[14px] leading-[1.65] text-pretty text-muted-foreground">
                {step.body}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
