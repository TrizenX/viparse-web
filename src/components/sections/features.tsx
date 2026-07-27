import { Section, SectionHeader } from "@/components/section"
import { Card, CardContent } from "@/components/ui/card"
import { FEATURES } from "@/lib/content"

export function Features() {
  return (
    <Section>
      <SectionHeader eyebrow="Features" title="Built for pipelines, not demos." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <Card
            key={feature.title}
            size="sm"
            className="transition-[box-shadow,border-color] duration-150 hover:border-foreground/20 hover:shadow-[0_1px_3px_rgba(0,0,0,0.07)]"
          >
            <CardContent className="grid content-start gap-2.5">
              <div className="flex items-center gap-2.5">
                <feature.icon className="size-[15px]" strokeWidth={1.7} />
                <h3 className="text-[14.5px] font-semibold tracking-[-0.01em]">
                  {feature.title}
                </h3>
              </div>
              <p className="text-[13.5px] leading-[1.6] text-pretty text-muted-foreground">
                {feature.body}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
