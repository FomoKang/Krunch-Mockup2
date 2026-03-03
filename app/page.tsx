"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ChevronRight } from "lucide-react"
import { auctionItems, formatKRW } from "@/lib/data"
import { ItemCard } from "@/components/item-card"
import { BottomNav } from "@/components/bottom-nav"
import { KrunchLogo } from "@/components/krunch-logo"

const categories = [
  { id: "all", label: "all", sublabel: "10,000+", icon: null },
  { id: "just-dropped", label: "just dropped", sublabel: "2025 August", icon: null },
  { id: "apparel", label: "apparel", sublabel: "more +", icon: null },
  { id: "sneakers", label: "sneakers", sublabel: "more +", icon: null },
  { id: "accessories", label: "accessories", sublabel: "more +", icon: null },
  { id: "artwork", label: "artwork", sublabel: "more +", icon: null },
]

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = auctionItems
    .filter((item) => {
      if (activeCategory === "just-dropped") return item.isJustDropped
      if (activeCategory !== "all") return item.category === activeCategory
      return true
    })
    .filter((item) => {
      if (!searchQuery) return true
      return (
        item.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

  const justDroppedItem = auctionItems.find((i) => i.isJustDropped)

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Hero Banner */}
      <section className="relative h-64 overflow-hidden bg-secondary">
        {justDroppedItem && justDroppedItem.images.length > 0 && (
          <Image
            src={justDroppedItem.images[0]}
            alt={`${justDroppedItem.artist} - ${justDroppedItem.itemName}`}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />

        {/* Logo - 좌상단 */}
        <div className="absolute left-4 top-4 z-10">
          <KrunchLogo />
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <p className="font-serif text-[1.4375rem] font-bold italic leading-none tracking-tight text-foreground">
                just
              </p>
              <p className="font-serif text-[1.4375rem] font-bold italic leading-none tracking-tight text-foreground">
                dropped
              </p>
            </div>
            {justDroppedItem && (
              <Link
                href={`/item/${justDroppedItem.id}`}
                className="flex flex-col items-end gap-0.5 text-right"
              >
                <p className="text-[9px] uppercase tracking-[0.2em] text-foreground/60">
                  item code
                </p>
                <p className="text-[11px] font-medium text-foreground">
                  {justDroppedItem.eventName || justDroppedItem.itemName}
                </p>
                <p className="text-[11px] font-bold text-foreground">
                  {justDroppedItem.dressedDate}
                </p>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="px-4 py-5" aria-label="Categories">
        <div className="grid grid-cols-3 gap-1.5">
          {categories.map((cat) => {
            const catItems = auctionItems.filter((item) => {
              if (cat.id === "all") return true
              if (cat.id === "just-dropped") return item.isJustDropped
              return item.category === cat.id
            })
            const previewItem = catItems.find((i) => i.images.length > 0)

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex flex-col items-center gap-1.5 border p-3 transition-all ${
                  activeCategory === cat.id
                    ? "border-foreground bg-foreground/5"
                    : "border-border hover:border-foreground/20"
                }`}
              >
                <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden bg-secondary">
                  {previewItem && previewItem.images.length > 0 ? (
                    <Image
                      src={previewItem.images[0]}
                      alt={cat.label}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="font-serif text-lg font-bold text-muted-foreground/30">
                      {cat.label.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-semibold tracking-wide text-foreground">
                  {cat.label}
                </span>
                <span className="flex items-center text-[9px] text-muted-foreground">
                  {cat.sublabel}
                  {cat.sublabel === "more +" && <ChevronRight className="ml-0.5 h-2.5 w-2.5" />}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Search */}
      <section className="px-4 pb-5">
        <div className="flex items-center gap-2.5 border border-border bg-card px-3.5 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            placeholder="Q  검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            aria-label="Search artists or items"
          />
        </div>
      </section>

      {/* Section Header */}
      <div className="flex items-baseline justify-between px-4 pb-3">
        <h2 className="font-serif text-[1.4375rem] font-bold italic leading-none tracking-tight text-foreground">
          {activeCategory === "all"
            ? "All Items"
            : activeCategory === "just-dropped"
              ? "Just Dropped"
              : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
        </h2>
        <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          {filteredItems.length}
          {" items"}
        </span>
      </div>

      {/* Items Grid */}
      <section className="grid grid-cols-2 gap-1.5 px-4" aria-label="Auction items">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </section>

      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24">
          <p className="font-serif text-lg text-muted-foreground/60">No items found</p>
          <p className="mt-1 text-xs text-muted-foreground/40">
            Try a different search or category
          </p>
        </div>
      )}

      <BottomNav />
    </main>
  )
}
