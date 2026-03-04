"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Heart } from "lucide-react"
import { auctionItems, getTimeRemaining, getDaysFromNow, formatKRW, DEMO_D_DAY } from "@/lib/data"
import { ItemCard } from "@/components/item-card"
import { BottomNav } from "@/components/bottom-nav"
import { BannerCarousel } from "@/components/banner-carousel"

const premiumItems = auctionItems.filter((i) => i.isJustDropped)
const hybridItems = auctionItems.filter((i) => !i.isJustDropped)

function AuctionSection({
  title,
  items,
  href,
  leadCard,
}: {
  title: string
  items: typeof auctionItems
  href: string
  leadCard?: React.ReactNode
}) {
  return (
    <section className="border-b border-border">
      <div className="flex items-baseline justify-between px-4 py-4 lg:px-6">
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
        <div className="flex gap-4 px-4 pb-6 lg:px-6" style={{ width: "max-content" }}>
          {leadCard}
          {items.map((item) => (
            <div key={item.id} className="w-[200px] flex-shrink-0 sm:w-[240px] lg:w-[280px]">
              <ItemCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function IanFeaturedCard() {
  const ianItem = auctionItems.find((i) => i.id === "ian-focus")
  const dDayVal = ianItem?.demoDDay ?? DEMO_D_DAY
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
    <div className="w-[200px] flex-shrink-0 sm:w-[240px] lg:w-[280px]">
      <Link
        href="/item/ian-focus"
        className="group flex flex-col overflow-hidden border border-border bg-card transition-all hover:border-foreground/20"
      >
        <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-white">
          <Image
            src="/ian-jacket.png"
            alt="FOCUS - Jacket Image"
            fill
            className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
            sizes="280px"
          />
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
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            IAN - Hearts2Hearts
          </p>
          <p className="min-h-9 line-clamp-2 text-[11px] font-medium leading-relaxed text-foreground">
            FOCUS - Jacket Image [1st mini album]
          </p>
          <div className="mt-1.5 flex items-end justify-between">
            <div>
              <p className="text-[9px] italic text-muted-foreground">Top Offer</p>
              <p className="text-xs font-bold tabular-nums text-foreground">
                KRW {ianItem ? formatKRW(ianItem.topOffer) : "—"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[9px] italic text-muted-foreground">Bids</p>
              <p className="text-xs font-bold tabular-nums text-foreground">
                {ianItem ? formatKRW(ianItem.offeredPerson) : "—"}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPremium = premiumItems.filter((item) => {
    if (!searchQuery) return true
    return (
      item.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })
  const filteredHybrid = hybridItems.filter((item) => {
    if (!searchQuery) return true
    return (
      item.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Banner - 가로 횡 스크롤 (아이브 등) */}
      <BannerCarousel />

      {/* Search */}
      <section className="border-b border-border bg-background px-4 py-4">
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

      {/* Premium Auction */}
      <AuctionSection
        title="Premium Auction"
        items={filteredPremium}
        href="/shop"
        leadCard={<IanFeaturedCard />}
      />

      {/* Hybrid Auction */}
      <AuctionSection title="Hybrid Auction" items={filteredHybrid} href="/shop" />

      {filteredPremium.length === 0 && filteredHybrid.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24">
          <p className="font-serif text-lg text-muted-foreground/60">No items found</p>
          <p className="mt-1 text-xs text-muted-foreground/40">
            Try a different search
          </p>
        </div>
      )}

      <BottomNav />
    </main>
  )
}
