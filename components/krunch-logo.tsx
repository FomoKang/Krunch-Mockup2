import Link from "next/link"

interface KrunchLogoProps {
  /** 메인 로고 텍스트 (기본: KRUNCH) */
  title?: string
  /** 태그라인 (기본: Own That Moment) */
  tagline?: string
  /** 부제목 (기본: KPOP Stage Costume Auction Platform) */
  subtitle?: string
  /** 링크 연결 (홈으로) */
  href?: string
  /** 컴팩트 모드 - 상단 고정용 작은 사이즈 */
  compact?: boolean
}

export function KrunchLogo({
  title = "KRUNCH",
  tagline = "Own That Moment",
  subtitle = "KPOP Stage Costume Auction Platform",
  href = "/",
  compact = false,
}: KrunchLogoProps) {
  const content = (
    <div className={`flex flex-col gap-0.5 ${compact ? "gap-0" : ""}`}>
      <span
        className={`font-serif font-bold tracking-tight text-foreground ${
          compact ? "text-[1.35rem]" : "text-[1.8rem]"
        }`}
      >
        {title}
      </span>
      <span
        className={`uppercase text-muted-foreground ${
          compact ? "text-[9px] tracking-widest" : "text-[10px] tracking-[0.2em]"
        }`}
      >
        {tagline}
      </span>
      <div
        className={`border-t border-muted-foreground/40 ${
          compact ? "w-8 mt-0.5" : "w-12 mt-1"
        }`}
      />
      <span
        className={`text-muted-foreground ${
          compact ? "text-[7px] tracking-wide" : "text-[9px] tracking-wide"
        }`}
      >
        {subtitle}
      </span>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block w-fit hover:opacity-90 transition-opacity">
        {content}
      </Link>
    )
  }

  return content
}
