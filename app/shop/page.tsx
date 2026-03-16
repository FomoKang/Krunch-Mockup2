"use client"

import { useMemo, useState } from "react"
import { auctionItems, formatKRW, type AuctionItem } from "@/lib/data"
import { ItemCard } from "@/components/item-card"
import { BottomNav } from "@/components/bottom-nav"

function hashStringToUint32(value: string): number {
  let hash = 2166136261
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function stableShuffle<T>(items: T[], seedKey: string): T[] {
  if (items.length <= 1) return items
  const rng = mulberry32(hashStringToUint32(seedKey))
  const out = [...items]

  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }

  return out
}

const imageOnlyItems = auctionItems.filter((item) => item.images.length > 0)
const premiumItems = imageOnlyItems.filter((item) => item.isJustDropped)
const hybridItems = imageOnlyItems.filter((item) => !item.isJustDropped)

function AuctionBlock({
  title,
  items,
  sortBy,
  setSortBy,
}: {
  title: string
  items: AuctionItem[]
  sortBy: "shuffle" | "popular" | "price" | "latest"
  setSortBy: (v: "shuffle" | "popular" | "price" | "latest") => void
}) {
  const sorted = useMemo(() => {
    if (sortBy === "shuffle") return items

    return [...items].sort((a, b) => {
      if (sortBy === "price") return b.topOffer - a.topOffer
      if (sortBy === "latest") return (a.demoDDay ?? 10) - (b.demoDDay ?? 10)
      return b.offeredPerson - a.offeredPerson
    })
  }, [items, sortBy])

  const totalBids = items.reduce((sum, item) => sum + item.offeredPerson, 0)

  return (
    <>
      <header className="pt-6 pb-4">
        <h2 className="font-serif text-2xl font-bold text-foreground">{title}</h2>
      </header>

      <div className="mb-5 flex items-stretch gap-px overflow-hidden border border-border">
        <div className="flex flex-1 flex-col justify-center bg-card px-4 py-3.5">
          <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">Active Auctions</p>
          <p className="mt-1 text-lg font-bold tabular-nums text-foreground">{formatKRW(items.length)}</p>
        </div>
        <div className="flex flex-1 flex-col items-end justify-center bg-card px-4 py-3.5">
          <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">Active Bids</p>
          <p className="mt-1 text-lg font-bold tabular-nums text-foreground">{formatKRW(totalBids)}</p>
        </div>
      </div>

      <div className="flex gap-2 pb-4">
        {(["shuffle", "popular", "price", "latest"] as const).map((option) => (
          <button
            key={option}
            onClick={() => setSortBy(option)}
            className={`border px-3 py-1.5 text-[10px] font-medium tracking-wide transition-all ${
              sortBy === option
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {option === "shuffle"
              ? "Shuffle"
              : option === "popular"
                ? "Popular"
                : option === "price"
                  ? "Price"
                  : "Latest"}
          </button>
        ))}
      </div>

      <section className="grid grid-cols-2 gap-1.5" aria-label={`${title} items`}>
        {sorted.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </section>
    </>
  )
}

export default function ShopPage() {
  const [premiumSort, setPremiumSort] = useState<"shuffle" | "popular" | "price" | "latest">("shuffle")
  const [hybridSort, setHybridSort] = useState<"shuffle" | "popular" | "price" | "latest">("shuffle")

  const shuffledPremium = useMemo(
    () => stableShuffle(premiumItems, `shop:premium:${premiumItems.map((i) => i.id).join("|")}`),
    []
  )
  const shuffledHybrid = useMemo(
    () => stableShuffle(hybridItems, `shop:hybrid:${hybridItems.map((i) => i.id).join("|")}`),
    []
  )

  return (
    <main className="min-h-screen bg-background pb-24">
      <AuctionBlock
        title="Premium Auction"
        items={shuffledPremium}
        sortBy={premiumSort}
        setSortBy={setPremiumSort}
      />

      <div className="border-t border-border" />

      <AuctionBlock
        title="Hybrid Auctions"
        items={shuffledHybrid}
        sortBy={hybridSort}
        setSortBy={setHybridSort}
      />

      <BottomNav />
    </main>
  )
}
