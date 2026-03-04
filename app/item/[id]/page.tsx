"use client"

import { use, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Heart, MoreHorizontal } from "lucide-react"
import { auctionItems, formatKRW } from "@/lib/data"
import { CountdownTimer } from "@/components/countdown-timer"
import { OfferInput } from "@/components/offer-input"
import { BottomNav } from "@/components/bottom-nav"

/** Mock bid history entry - 실제 구현 시 API 연동 */
type BidEntry = { id: string; amount: number; time: string; rank: number; name: string }

function useBidHistory(itemId: string, baseOffer: number) {
  const [entries, setEntries] = useState<BidEntry[]>([])

  useEffect(() => {
    const names = ["K***7", "B***n", "J***k", "S***y", "M***a", "R***2", "T***3", "L***9", "N***4", "P***1"]
    const generate = (): BidEntry[] => {
      const count = 8 + Math.floor(Math.random() * 5)
      return Array.from({ length: count }, (_, i) => {
        const offset = Math.floor(Math.random() * 200000) - 50000
        const amount = Math.max(100000, baseOffer + offset - i * 50000)
        const mins = Math.floor(Math.random() * 60)
        return {
          id: `bid-${Date.now()}-${i}`,
          amount,
          time: mins === 0 ? "Just now" : `${mins}m ago`,
          rank: i + 1,
          name: names[i % names.length],
        }
      })
        .sort((a, b) => b.amount - a.amount)
        .map((e, i) => ({ ...e, rank: i + 1 }))
    }
    setEntries(generate())
    const interval = setInterval(() => setEntries(generate()), 8000)
    return () => clearInterval(interval)
  }, [itemId, baseOffer])

  return entries
}

export default function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const item = auctionItems.find((i) => i.id === id)
  const [activeTab, setActiveTab] = useState<"bidding" | "history">("bidding")
  const [offerSubmitted, setOfferSubmitted] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const bidHistory = useBidHistory(id, item?.topOffer ?? 0)

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

  const relatedItems = auctionItems.filter(
    (i) => i.artist === item.artist && i.id !== item.id
  )

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Sticky Header - below TopHeader */}
      <header className="sticky top-14 z-50 flex items-center justify-between border-b border-border/50 bg-background/95 py-3 backdrop-blur-md">
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
          <div className="border-b border-border bg-card p-4">
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

          {/* Artist Name */}
          <div className="border-b border-border py-4">
            <p className="font-serif text-xl font-bold text-foreground">{item.artist}</p>
          </div>

          {/* Main Item Image */}
          {item.images.length > 0 ? (
            <div className={`relative aspect-square w-full overflow-hidden bg-white lg:aspect-[4/3] ${item.imageObjectFit === "contain" ? "flex items-center justify-center" : ""}`}>
              {item.imageScale ? (
                <div
                  className="absolute inset-0"
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
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <Image
                  src={item.images[0]}
                  alt={item.itemName}
                  fill
                  className={item.imageObjectFit === "contain" ? "object-contain" : "object-cover"}
                  style={{ objectPosition: item.imageObjectPosition || "center center" }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
            </div>
          ) : (
            <div className="aspect-square w-full bg-white lg:aspect-[4/3]" />
          )}

          {/* Artist Stage / Face Image */}
          {item.images.length > 1 && (
            <div className="relative aspect-[4/3] w-full overflow-hidden border-t border-border bg-secondary">
              <Image
                src={item.images[1]}
                alt={`${item.artist} stage`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}

          {/* Related Items Carousel */}
          {relatedItems.length > 0 && (
            <div className="flex gap-2.5 overflow-x-auto py-4">
              {relatedItems.map((related) => (
                <Link
                  key={related.id}
                  href={`/item/${related.id}`}
                  className="relative h-16 w-16 shrink-0 overflow-hidden border border-border bg-white transition-all hover:border-foreground/30"
                >
                  {related.images.length > 0 ? (
                    <Image
                      src={related.images[0]}
                      alt={related.itemName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center font-serif text-xs text-muted-foreground/40">
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
                className={`flex items-center justify-between px-4 py-3.5 lg:px-0 ${
                  index !== item.facts.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                <span className="text-xs text-muted-foreground">{fact.label}</span>
                <span className="text-xs font-semibold text-foreground">{fact.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-border/50 px-4 py-3.5 lg:px-0">
              <span className="text-xs text-muted-foreground">dressed date</span>
              <span className="text-xs font-semibold text-foreground">{item.dressedDate}</span>
            </div>
          </div>

          {/* Description */}
          <div className="py-6">
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
          <div className="pb-6">
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

        </div>

        {/* RIGHT COLUMN - Bidding */}
        <div className="lg:w-[420px] lg:shrink-0">
          {/* Tabs: Bidding / History */}
          <div className="sticky top-12 z-30 border-b border-border bg-background">
            <div className="flex">
              <button
                onClick={() => setActiveTab("bidding")}
                className={`flex-1 py-3.5 text-center text-xs font-semibold tracking-wide transition-colors ${
                  activeTab === "bidding"
                    ? "border-b-2 border-foreground text-foreground"
                    : "text-muted-foreground hover:text-foreground/60"
                }`}
              >
                Bidding
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 py-3.5 text-center text-xs font-semibold tracking-wide transition-colors ${
                  activeTab === "history"
                    ? "border-b-2 border-foreground text-foreground"
                    : "text-muted-foreground hover:text-foreground/60"
                }`}
              >
                History
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-5">
            {activeTab === "bidding" ? (
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
              <div className="flex flex-col gap-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-xs italic text-muted-foreground underline underline-offset-2">
                    Bidding History
                  </p>
                  <span className="text-[9px] text-muted-foreground">
                    Updates every 8s
                  </span>
                </div>
                <div className="max-h-80 overflow-y-auto border border-border">
                  <div className="divide-y divide-border">
                    {bidHistory.map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-5 text-right text-[10px] font-medium tabular-nums text-muted-foreground">
                            {entry.rank}
                          </span>
                          <span className="text-xs text-foreground">
                            {entry.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold tabular-nums text-foreground">
                            KRW {formatKRW(entry.amount)}
                          </span>
                          <span className="text-[9px] text-muted-foreground">
                            {entry.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
