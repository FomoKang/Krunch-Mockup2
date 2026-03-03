"use client"

import { useState } from "react"
import { auctionItems, formatKRW } from "@/lib/data"
import { ItemCard } from "@/components/item-card"
import { BottomNav } from "@/components/bottom-nav"

export default function ShopPage() {
  const [sortBy, setSortBy] = useState<"popular" | "price" | "latest">("popular")

  const sorted = [...auctionItems].sort((a, b) => {
    if (sortBy === "price") return b.topOffer - a.topOffer
    if (sortBy === "latest") return a.isJustDropped ? -1 : 1
    return b.offeredPerson - a.offeredPerson
  })

  const totalVolume = auctionItems.reduce((sum, item) => sum + item.topOffer, 0)
  const totalBids = auctionItems.reduce((sum, item) => sum + item.offeredPerson, 0)

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          marketplace
        </p>
        <h1 className="mt-1 font-serif text-2xl font-bold text-foreground">
          Shop
        </h1>
      </header>

      {/* Stats Banner */}
      <div className="mx-5 mb-5 flex items-stretch gap-px overflow-hidden border border-border">
        <div className="flex flex-1 flex-col justify-center bg-card px-4 py-3.5">
          <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
            Total Volume
          </p>
          <p className="mt-1 text-lg font-bold tabular-nums text-foreground">
            {"KRW "}
            {formatKRW(totalVolume)}
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

      {/* Sort Options */}
      <div className="flex gap-2 px-5 pb-4">
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

      {/* Items Grid */}
      <section className="grid grid-cols-2 gap-1.5 px-4" aria-label="Shop items">
        {sorted.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </section>

      <BottomNav />
    </main>
  )
}
