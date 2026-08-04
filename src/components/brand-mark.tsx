import { cn } from "@/lib/utils"

/**
 * viparse icon mark — the TrizenX rails, carrying viparse's own idea.
 *
 * The parent mark at trizenx.com is four equal rails, one per project, each in
 * that project's colour. adforge varies their *widths* to say "one paid shot,
 * three free variants". Liftoff varies their *heights*, climbing, for the launch
 * it is named after. viparse varies whether a rail is *whole*: the left two are
 * broken, at uneven points, and the right two are continuous.
 *
 * That is the product in one glance. A document typed in .VnTime arrives as
 * text broken into the wrong pieces — `B¸o c¸o tµi chÝnh` — and what viparse
 * returns is the same text, unbroken. The breaks are deliberately not aligned
 * with each other, because corruption is not tidy.
 *
 * Same geometry grammar as the parent so the family reads at a glance: rails 4
 * wide, rx 2, at x = 3 / 10 / 17 / 24 inside a 32 box, spanning y = 4..28.
 * Structure does the work rather than colour, so the meaning survives at
 * favicon size, and nothing here is a background — it has to sit on a light or
 * a dark tab strip, same as the parent.
 */

/** [y, height] runs per rail. Two runs is a broken rail, one is a whole one. */
const RAILS: [number, number][][] = [
  [
    [4, 10],
    [17, 11],
  ],
  [
    [4, 8],
    [15, 13],
  ],
  [[4, 24]],
  [[4, 24]],
]

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-[17px] shrink-0", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        {RAILS.map((runs, i) =>
          runs.map(([y, h]) => (
            <rect key={`${i}-${y}`} x={3 + i * 7} y={y} width={4} height={h} rx={2} />
          )),
        )}
      </g>
    </svg>
  )
}
