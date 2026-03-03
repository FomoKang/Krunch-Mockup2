"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, MoreHorizontal } from "lucide-react"
import { auctionItems, formatKRW } from "@/lib/data"
import { CountdownTimer } from "@/components/countdown-timer"
import { OfferInput } from "@/components/offer-input"
import { BottomNav } from "@/components/bottom-nav"

export default function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const item = auctionItems.find((i) => i.id === id)
  const [activeTab, setActiveTab] = useState<"new" | "bid">("new")
  const [offerSubmitted, setOfferSubmitted] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  if (!item) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <p className="font-serif text-xl text-muted-foreground">Item not found</p>
          <Link href="/" className="text-xs text-muted-foreground underline">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const hasImages = item.images.length > 0
  const relatedItems = auctionItems.filter(
    (i) => i.artist === item.artist && i.id !== item.id
  )

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border/50 bg-background/95 px-4 py-3 backdrop-blur-md">
        <Link href="/" className="flex items-center" aria-label="Go back">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </Link>
        <div className="flex items-center gap-4">
          <button aria-label="More options">
            <MoreHorizontal className="h-5 w-5 text-foreground" />
          </button>
          <button
            className="flex items-center gap-1.5 text-foreground"
            onClick={() => setIsSaved(!isSaved)}
            aria-label={isSaved ? "Remove from saved" : "Save item"}
          >
            <Heart
              className={`h-4 w-4 transition-all ${isSaved ? "fill-foreground" : ""}`}
            />
            <span className="text-[11px] font-medium">
              {isSaved ? "Saved" : "Save"}
            </span>
          </button>
        </div>
      </header>

      {/* Desktop layout: 2 columns / Mobile: single column */}
      <div className="lg:flex lg:gap-0">
        {/* LEFT COLUMN - Item Info */}
        <div className="lg:flex-1 lg:border-r lg:border-border">
          {/* Item Code Header */}
          <div className="border-b border-border bg-card p-4 lg:flex lg:items-start lg:gap-4">
            {hasImages && (
              <div className="relative mr-3 hidden h-14 w-14 shrink-0 overflow-hidden lg:block">
                <Image
                  src={item.images[0]}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                item code
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {item.dressedDate}
              </p>
              {item.eventName && (
                <p className="text-[11px] text-muted-foreground">{item.eventName}</p>
              )}
              <p className="mt-1 text-sm font-semibold text-foreground">{item.itemName}</p>
            </div>
          </div>

          {/* Product Image - mobile only full-width */}
          {hasImages && (
            <div className="relative aspect-square w-full overflow-hidden bg-secondary lg:aspect-[4/3]">
              <Image
                src={item.images[0]}
                alt={item.itemName}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Artist Name */}
          <div className="px-5 pt-5">
            <p className="font-serif text-xl font-bold text-foreground">{item.artist}</p>
          </div>

          {/* Related Items Carousel */}
          {relatedItems.length > 0 && (
            <div className="flex gap-2.5 overflow-x-auto px-5 py-4">
              {relatedItems.map((related) => (
                <Link
                  key={related.id}
                  href={`/item/${related.id}`}
                  className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border border-border bg-secondary transition-all hover:border-foreground/30"
                >
                  {related.images.length > 0 ? (
                    <Image
                      src={related.images[0]}
                      alt={related.itemName}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-serif text-xs text-muted-foreground/40">
                      {related.itemName.slice(0, 4)}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* Facts Table */}
          <div className="border-y border-border">
            {item.facts.map((fact, index) => (
              <div
                key={fact.label}
                className={`flex items-center justify-between px-5 py-3.5 ${
                  index !== item.facts.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                <span className="text-xs text-muted-foreground">{fact.label}</span>
                <span className="text-xs font-semibold text-foreground">{fact.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-border/50 px-5 py-3.5">
              <span className="text-xs text-muted-foreground">dressed date</span>
              <span className="text-xs font-semibold text-foreground">{item.dressedDate}</span>
            </div>
          </div>

          {/* Description */}
          <div className="px-5 py-6">
            <p className="text-sm italic font-medium text-foreground underline underline-offset-4">
              Description
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
              {item.description}
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
              {item.descriptionKo}
            </p>
          </div>

          {/* Facts Section */}
          <div className="px-5 pb-6">
            <p className="text-sm italic font-medium text-foreground underline underline-offset-4">
              Facts
            </p>
            <div className="mt-3 flex flex-col gap-1">
              {item.facts.map((fact) => (
                <p key={fact.label} className="text-[13px] text-muted-foreground">
                  {fact.label}
                  {" - "}
                  {fact.value}
                </p>
              ))}
            </div>
          </div>

          {/* Full-size reference images for items with images */}
          {hasImages && (
            <div className="grid grid-cols-2 gap-1 px-5 pb-6">
              {item.images.map((img, i) => (
                <div key={i} className="relative aspect-square overflow-hidden bg-secondary">
                  <Image
                    src={img}
                    alt={`${item.itemName} reference ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN - Bidding */}
        <div className="lg:w-[420px] lg:shrink-0">
          {/* Tabs: New / Bid */}
          <div className="sticky top-12 z-30 border-b border-border bg-background">
            <div className="flex">
              <button
                onClick={() => setActiveTab("new")}
                className={`flex-1 py-3.5 text-center text-xs font-semibold tracking-wide transition-colors ${
                  activeTab === "new"
                    ? "border-b-2 border-foreground text-foreground"
                    : "text-muted-foreground hover:text-foreground/60"
                }`}
              >
                신상품
              </button>
              <button
                onClick={() => setActiveTab("bid")}
                className={`flex-1 py-3.5 text-center text-xs font-semibold tracking-wide transition-colors ${
                  activeTab === "bid"
                    ? "border-b-2 border-foreground text-foreground"
                    : "text-muted-foreground hover:text-foreground/60"
                }`}
              >
                입찰
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-5">
            {activeTab === "bid" ? (
              <div className="flex flex-col gap-6">
                {offerSubmitted ? (
                  <div className="flex flex-col items-center gap-3 py-10">
                    <div className="flex h-16 w-16 items-center justify-center border border-foreground">
                      <span className="font-serif text-2xl text-foreground">!</span>
                    </div>
                    <p className="font-serif text-2xl font-bold text-foreground">
                      Offer Submitted
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Your bid has been registered successfully
                    </p>
                    <button
                      onClick={() => setOfferSubmitted(false)}
                      className="mt-4 border border-border px-6 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                    >
                      Place Another Bid
                    </button>
                  </div>
                ) : (
                  <OfferInput onSubmit={() => setOfferSubmitted(true)} />
                )}

                {/* Stats */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p className="text-xs italic text-muted-foreground underline underline-offset-2">
                      Top Offer
                    </p>
                    <p className="mt-1.5 text-xl font-bold tabular-nums text-foreground">
                      {"KRW "}
                      {formatKRW(item.topOffer)}
                    </p>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-xs italic text-muted-foreground underline underline-offset-2">
                      Offered Person
                    </p>
                    <p className="mt-1.5 text-xl font-bold tabular-nums text-foreground">
                      {formatKRW(item.offeredPerson)}
                    </p>
                  </div>
                </div>

                <CountdownTimer
                  expirationDate={item.expirationDate}
                  variant="compact"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {/* Your Offer section at top for "new" tab too */}
                <OfferInput onSubmit={() => {
                  setActiveTab("bid")
                  setOfferSubmitted(true)
                }} />

                {/* Stats below */}
                <div className="flex items-start justify-between border-t border-border pt-5">
                  <div>
                    <p className="text-xs italic text-muted-foreground underline underline-offset-2">
                      Top Offer
                    </p>
                    <p className="mt-1.5 text-xl font-bold tabular-nums text-foreground">
                      {"KRW "}
                      {formatKRW(item.topOffer)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs italic text-muted-foreground underline underline-offset-2">
                      Offered Person
                    </p>
                    <p className="mt-1.5 text-xl font-bold tabular-nums text-foreground">
                      {formatKRW(item.offeredPerson)}
                    </p>
                  </div>
                </div>

                {/* Countdown */}
                <CountdownTimer
                  expirationDate={item.expirationDate}
                  variant="compact"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
