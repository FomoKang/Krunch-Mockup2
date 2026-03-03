"use client"

import { useState } from "react"
import { auctionItems } from "@/lib/data"
import { ItemCard } from "@/components/item-card"
import { BottomNav } from "@/components/bottom-nav"

export default function StylePage() {
  const artists = [...new Set(auctionItems.map((item) => item.artist))]
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null)

  const filtered = selectedArtist
    ? auctionItems.filter((i) => i.artist === selectedArtist)
    : auctionItems.sort((a, b) => b.offeredPerson - a.offeredPerson)

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          trending now
        </p>
        <h1 className="mt-1 font-serif text-2xl font-bold text-foreground">
          Style
        </h1>
      </header>

      {/* Artist Filter Chips */}
      <div className="flex gap-2 overflow-x-auto px-5 pb-5 scrollbar-none">
        <button
          onClick={() => setSelectedArtist(null)}
          className={`shrink-0 border px-4 py-2 text-[11px] font-medium tracking-wide transition-all ${
            !selectedArtist
              ? "border-foreground bg-foreground text-background"
              : "border-border text-foreground hover:border-foreground/30"
          }`}
        >
          All
        </button>
        {artists.map((artist) => (
          <button
            key={artist}
            onClick={() => setSelectedArtist(artist === selectedArtist ? null : artist)}
            className={`shrink-0 border px-4 py-2 text-[11px] font-medium tracking-wide transition-all ${
              selectedArtist === artist
                ? "border-foreground bg-foreground text-background"
                : "border-border text-foreground hover:border-foreground/30"
            }`}
          >
            {artist}
          </button>
        ))}
      </div>

      {/* Ranking Header */}
      <div className="flex items-baseline justify-between px-5 pb-3">
        <p className="text-xs font-medium text-muted-foreground">
          {selectedArtist || "Most Popular"}
        </p>
        <p className="text-[10px] text-muted-foreground">
          {filtered.length}
          {" results"}
        </p>
      </div>

      {/* Items Grid */}
      <section className="grid grid-cols-2 gap-1.5 px-4" aria-label="Trending items">
        {filtered.map((item, index) => (
          <div key={item.id} className="relative">
            <div className="absolute left-2 top-2 z-10 flex h-6 w-6 items-center justify-center bg-background/80 backdrop-blur-sm">
              <span className="text-[10px] font-bold tabular-nums text-foreground">
                {index + 1}
              </span>
            </div>
            <ItemCard item={item} />
          </div>
        ))}
      </section>

      <BottomNav />
    </main>
  )
}
