import { Section, SectionHeader } from "@/components/section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQ } from "@/lib/content"

export function Faq() {
  return (
    <Section>
      <SectionHeader eyebrow="FAQ" title="Questions." className="mb-6" />

      <Accordion
        type="multiple"
        defaultValue={[FAQ[0].question]}
        className="max-w-[780px] border-t"
      >
        {FAQ.map((item) => (
          <AccordionItem
            key={item.question}
            value={item.question}
            className="border-b not-last:border-b"
          >
            <AccordionTrigger className="py-4.5 text-[15px] hover:no-underline hover:text-brand">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="max-w-[640px] pb-5 text-[14.5px] leading-[1.7] text-pretty text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}
