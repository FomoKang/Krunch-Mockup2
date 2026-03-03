"use client"

import Image from "next/image"
import Link from "next/link"
import { formatKRW, type AuctionItem } from "@/lib/data"
import { Heart } from "lucide-react"

interface ItemCardProps {
  item: AuctionItem
  showArtist?: boolean
  size?: "default" | "large"
}

export function ItemCard({ item, showArtist = true, size = "default" }: ItemCardProps) {
  const hasImage = item.images.length > 0

  return (
    <Link
      href={`/item/${item.id}`}
      className="group flex flex-col overflow-hidden border border-border bg-card transition-all hover:border-foreground/20"
    >
      <div className={`relative overflow-hidden bg-secondary ${size === "large" ? "aspect-[4/5]" : "aspect-square"}`}>
        {hasImage ? (
          <Image
            src={item.images[0]}
            alt={item.itemName}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
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
        {item.isJustDropped && (
          <div className="absolute left-0 top-3 bg-foreground px-2.5 py-1">
            <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-background">
              just dropped
            </span>
          </div>
        )}
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
        <p className="line-clamp-2 text-[11px] font-medium leading-relaxed text-foreground">
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
