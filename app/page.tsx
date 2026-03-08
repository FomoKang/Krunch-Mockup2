"use client"

import { useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { auctionItems } from "@/lib/data"
import { ItemCard } from "@/components/item-card"
import { BottomNav } from "@/components/bottom-nav"
import { BannerCarousel } from "@/components/banner-carousel"

const LOOP_COUNT = 10

function loopItems<T>(items: T[], count: number): T[] {
  if (items.length === 0) return []
  return Array.from({ length: count }, (_, index) => items[index % items.length])
}

const imageOnlyItems = auctionItems.filter((item) => item.images.length > 0)
const premiumItems = imageOnlyItems.filter((item) => item.isJustDropped)
const hybridItems = imageOnlyItems.filter((item) => !item.isJustDropped)

function AuctionSection({
  title,
  items,
  href,
}: {
  title: string
  items: typeof auctionItems
  href: string
}) {
  return (
    <section className="border-b border-border">
      <div className="flex items-baseline justify-between py-4">
        <h2 className="font-serif text-[1.4375rem] font-bold italic leading-none tracking-tight text-foreground">
          {title}
        </h2>
        <Link
          href={href}
          className="text-[11px] font-medium text-foreground underline underline-offset-2 hover:text-foreground/80"
        >
          More
        </Link>
      </div>
      <div className="overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex gap-4 pb-6 pl-4 pr-4 lg:pl-0 lg:pr-12" style={{ width: "max-content" }}>
          {items.map((item, index) => (
            <div key={`${item.id}-${index}`} className="w-[200px] flex-shrink-0 sm:w-[240px] lg:w-[280px]">
              <ItemCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const loopedPremium = loopItems(premiumItems, LOOP_COUNT)
  const loopedHybrid = loopItems(hybridItems, LOOP_COUNT)

  const filteredPremium = loopedPremium.filter((item) => {
    if (!searchQuery) return true
    return (
      item.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const filteredHybrid = loopedHybrid.filter((item) => {
    if (!searchQuery) return true
    return (
      item.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <main className="min-h-screen bg-background pb-24">
      <BannerCarousel />

      <section className="border-b border-border bg-background py-4">
        <div className="flex items-center gap-2.5 rounded-none border border-border bg-card px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search artist or item"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            aria-label="Search"
          />
        </div>
      </section>

      <AuctionSection title="Premium Auction" items={filteredPremium} href="/shop" />
      <AuctionSection title="Hybrid Auction" items={filteredHybrid} href="/shop" />

      {filteredPremium.length === 0 && filteredHybrid.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24">
          <p className="font-serif text-lg text-muted-foreground/60">No items found</p>
          <p className="mt-1 text-xs text-muted-foreground/40">Try a different search</p>
        </div>
      )}

      <BottomNav />
    </main>
  )
}
