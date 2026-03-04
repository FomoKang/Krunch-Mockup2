"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { formatKRW, getTimeRemaining, getDaysFromNow, DEMO_D_DAY, type AuctionItem } from "@/lib/data"
import { Heart } from "lucide-react"

interface ItemCardProps {
  item: AuctionItem
  showArtist?: boolean
  size?: "default" | "large"
}

export function ItemCard({ item, showArtist = true, size = "default" }: ItemCardProps) {
  const hasImage = item.images.length > 0
  const dDayVal = item.demoDDay ?? DEMO_D_DAY
  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(getDaysFromNow(dDayVal)))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(getDaysFromNow(dDayVal)))
    }, 60000)
    return () => clearInterval(timer)
  }, [dDayVal])

  const padDay = (n: number) => String(n).padStart(2, "0")
  const dDay =
    timeLeft.days > 0
      ? `D-${padDay(timeLeft.days)}`
      : timeLeft.total > 0
        ? `${timeLeft.hours}h ${timeLeft.minutes}m`
        : "종료"

  return (
    <Link
      href={`/item/${item.id}`}
      className="group flex flex-col overflow-hidden border border-border bg-card transition-all hover:border-foreground/20"
    >
      <div className={`relative overflow-hidden ${item.imageObjectFit === "contain" ? "flex aspect-square items-center justify-center bg-white" : `bg-secondary ${size === "large" ? "aspect-[4/5]" : "aspect-square"}`}`}>
        {hasImage ? (
          item.imageScale ? (
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              style={{
                transform: `scale(${item.imageScale})${item.imageTranslateY ? ` translateY(${item.imageTranslateY})` : ""}`,
                transformOrigin: "center center",
              }}
            >
              <Image
                src={item.images[0]}
                alt={item.itemName}
                fill
                className={item.imageObjectFit === "contain" ? "object-contain" : "object-cover"}
                style={{ objectPosition: item.imageObjectPosition || "center center" }}
              />
            </div>
          ) : (
            <Image
              src={item.images[0]}
              alt={item.itemName}
              fill
              className={`transition-transform duration-700 group-hover:scale-105 ${item.imageObjectFit === "contain" ? "object-contain object-center" : "object-cover"}`}
            />
          )
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-secondary">
            <span className="font-serif text-2xl font-bold text-muted-foreground/40">
              {item.artist.charAt(0)}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/30">
              coming soon
            </span>
          </div>
        )}
        {item.isJustDropped && item.showJustDroppedBadge !== false && (
          <div className="absolute left-0 top-3 bg-foreground px-2.5 py-1">
            <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-background">
              just dropped
            </span>
          </div>
        )}
        <div className="absolute bottom-2 right-2 flex items-center justify-center rounded-full border border-foreground/15 bg-background/85 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-[10px] font-medium leading-none tabular-nums tracking-tight text-foreground">
            {dDay}
          </span>
        </div>
        <button
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/40 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          aria-label="Save item"
        >
          <Heart className="h-3.5 w-3.5 text-foreground" />
        </button>
      </div>
      <div className="flex flex-col gap-1.5 p-3">
        {showArtist && (
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {item.artist}
          </p>
        )}
        <p className="min-h-9 line-clamp-2 text-[11px] font-medium leading-relaxed text-foreground">
          {item.itemName}
        </p>
        <div className="mt-1.5 flex items-end justify-between">
          <div>
            <p className="text-[9px] italic text-muted-foreground">Top Offer</p>
            <p className="text-xs font-bold tabular-nums text-foreground">
              {"KRW "}
              {formatKRW(item.topOffer)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] italic text-muted-foreground">Bids</p>
            <p className="text-xs font-bold tabular-nums text-foreground">
              {formatKRW(item.offeredPerson)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
