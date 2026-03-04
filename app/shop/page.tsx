"use client"

import { useState } from "react"
import { auctionItems, formatKRW, type AuctionItem } from "@/lib/data"
import { ItemCard } from "@/components/item-card"
import { BottomNav } from "@/components/bottom-nav"

const premiumItems = auctionItems.filter((i) => i.isJustDropped)
const hybridItems = auctionItems.filter((i) => !i.isJustDropped)

function AuctionBlock({
  title,
  items,
  sortBy,
  setSortBy,
}: {
  title: string
  items: AuctionItem[]
  sortBy: "popular" | "price" | "latest"
  setSortBy: (v: "popular" | "price" | "latest") => void
}) {
  const sorted = [...items].sort((a, b) => {
    if (sortBy === "price") return b.topOffer - a.topOffer
    if (sortBy === "latest") return (a.demoDDay ?? 10) - (b.demoDDay ?? 10)
    return b.offeredPerson - a.offeredPerson
  })

  const totalBids = items.reduce((sum, item) => sum + item.offeredPerson, 0)

  return (
    <>
      <header className="pt-6 pb-4">
        <h2 className="font-serif text-2xl font-bold text-foreground">{title}</h2>
      </header>

      <div className="mb-5 flex items-stretch gap-px overflow-hidden border border-border">
        <div className="flex flex-1 flex-col justify-center bg-card px-4 py-3.5">
          <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
            Active Auctions
          </p>
          <p className="mt-1 text-lg font-bold tabular-nums text-foreground">
            {formatKRW(items.length)}
          </p>
        </div>
        <div className="flex flex-1 flex-col items-end justify-center bg-card px-4 py-3.5">
          <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
            Active Bids
          </p>
          <p className="mt-1 text-lg font-bold tabular-nums text-foreground">
            {formatKRW(totalBids)}
          </p>
        </div>
      </div>

      <div className="flex gap-2 pb-4">
        {(["popular", "price", "latest"] as const).map((option) => (
          <button
            key={option}
            onClick={() => setSortBy(option)}
            className={`border px-3 py-1.5 text-[10px] font-medium tracking-wide transition-all ${
              sortBy === option
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {option === "popular" ? "인기순" : option === "price" ? "가격순" : "최신순"}
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
  const [premiumSort, setPremiumSort] = useState<"popular" | "price" | "latest">("popular")
  const [hybridSort, setHybridSort] = useState<"popular" | "price" | "latest">("popular")

  return (
    <main className="min-h-screen bg-background pb-24">
      <AuctionBlock
        title="Premium Auction"
        items={premiumItems}
        sortBy={premiumSort}
        setSortBy={setPremiumSort}
      />

      <div className="border-t border-border" />

      <AuctionBlock
        title="Hybrid Auctions"
        items={hybridItems}
        sortBy={hybridSort}
        setSortBy={setHybridSort}
      />

      <BottomNav />
    </main>
  )
}
