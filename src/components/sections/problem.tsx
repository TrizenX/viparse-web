import { Section } from "@/components/section"

export function Problem() {
  return (
    <Section className="py-18">
      <div className="grid max-w-[780px] gap-4">
        <span className="eyebrow">The problem</span>
        <h2 className="text-[34px] leading-[1.18] font-semibold tracking-[-0.028em] text-balance">
          Your parser reads the file. It doesn&apos;t read Vietnamese.
        </h2>
        <p className="text-[16px] leading-[1.75] text-pretty text-muted-foreground">
          Millions of Vietnamese documents were authored in pre-Unicode fonts —
          .VnTime, VNI, VISCII. Generic loaders like Unstructured or LlamaParse
          extract the bytes faithfully and hand your pipeline garbage:{" "}
          <span className="font-legacy text-[14px] text-legacy">
            &quot;Tiªu ®Ò&quot;
          </span>{" "}
          instead of{" "}
          <span className="font-mono text-[14px] text-foreground">
            &quot;Tiêu đề&quot;
          </span>
          . Embeddings built on garbled text retrieve nothing. viparse handles
          exactly that layer: detect the legacy encoding, convert to Unicode,
          enforce NFC — then get out of your way.
        </p>
      </div>
    </Section>
  )
}
