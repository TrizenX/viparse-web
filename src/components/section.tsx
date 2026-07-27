import { cn } from "@/lib/utils"

export function Section({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("pb-18 scroll-mt-20", className)}
      {...props}
    />
  )
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  badge,
  className,
  children,
}: {
  eyebrow: string
  title: string
  description?: string
  badge?: React.ReactNode
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn("mb-7 grid gap-4", className)}>
      <div className="flex items-center gap-3">
        <span className="eyebrow">{eyebrow}</span>
        {badge}
      </div>
      <h2 className="text-[30px] leading-[1.2] font-semibold tracking-[-0.028em] text-balance">
        {title}
      </h2>
      {description ? (
        <p className="max-w-[680px] text-[16px] leading-[1.7] text-pretty text-muted-foreground">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  )
}
