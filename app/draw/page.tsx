"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { auctionItems, formatKRW } from "@/lib/data"
import { BottomNav } from "@/components/bottom-nav"

type DrawState = "ready" | "drawing" | "won" | "reveal"

export default function DrawPage() {
  const [drawState, setDrawState] = useState<DrawState>("ready")
  const [revealedCells, setRevealedCells] = useState<boolean[]>(
    new Array(12).fill(false)
  )
  const [krunchCell] = useState(() => Math.floor(Math.random() * 12))

  const drawItem = auctionItems.find((i) => i.isJustDropped) ?? auctionItems[0]

  const handleEnterDraw = () => {
    setDrawState("drawing")
    setRevealedCells(new Array(12).fill(false))
  }

  const handleCellClick = useCallback(
    (index: number) => {
      if (drawState !== "drawing") return

      setRevealedCells((prev) => {
        const next = [...prev]
        next[index] = true
        const revealedCount = next.filter(Boolean).length

        if (revealedCount >= 5) {
          setTimeout(() => setDrawState("won"), 500)
        }

        return next
      })
    },
    [drawState]
  )

  const handleOpenRare = () => {
    setDrawState("reveal")
  }

  const handleReset = () => {
    setDrawState("ready")
    setRevealedCells(new Array(12).fill(false))
  }

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Header Bar */}
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          {drawItem.images.length > 0 && (
            <div className="relative h-12 w-12 shrink-0 overflow-hidden">
              <Image
                src={drawItem.images[0]}
                alt={drawItem.artist}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              item code
            </p>
            <p className="truncate text-[11px] font-medium text-foreground">
              {drawItem.eventName || drawItem.itemName}
            </p>
            <p className="text-[10px] text-muted-foreground">{drawItem.dressedDate}</p>
          </div>
        </div>
      </div>

      {/* READY STATE */}
      {drawState === "ready" && (
        <div className="flex flex-col">
          {/* Hero Image */}
          <div className="relative h-52 overflow-hidden bg-secondary">
            {drawItem.images.length > 0 && (
              <Image
                src={drawItem.images[0]}
                alt={drawItem.itemName}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="font-serif text-3xl font-bold italic leading-none text-foreground">
                just
              </p>
              <p className="font-serif text-3xl font-bold italic leading-none text-foreground">
                dropped
              </p>
            </div>
          </div>

          {/* Item Preview */}
          {drawItem.images.length > 0 && (
            <div className="flex justify-center py-6">
              <div className="relative h-48 w-48 overflow-hidden bg-secondary">
                <Image
                  src={drawItem.images[0]}
                  alt={drawItem.itemName}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Item Stats */}
          <div className="px-5 pb-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs italic text-muted-foreground underline underline-offset-2">
                  Artist
                </p>
                <p className="mt-1 text-sm font-bold text-foreground">{drawItem.artist}</p>
              </div>
              <div className="text-right">
                <p className="text-xs italic text-muted-foreground underline underline-offset-2">
                  Dressed Date
                </p>
                <p className="mt-1 text-sm font-bold text-foreground">
                  {drawItem.dressedDate}
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-xs italic text-muted-foreground underline underline-offset-2">
                  Offered Person
                </p>
                <p className="mt-1 text-xl font-bold tabular-nums text-foreground">
                  {formatKRW(drawItem.offeredPerson)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs italic text-muted-foreground underline underline-offset-2">
                  Price
                </p>
                <p className="mt-1 text-xl font-bold tabular-nums text-foreground">
                  KRW 100
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="px-5 pb-6">
            <button
              onClick={handleEnterDraw}
              className="w-full bg-foreground py-4 text-center text-sm font-semibold tracking-[0.15em] uppercase text-background transition-opacity hover:opacity-90"
            >
              Enter the Draw
            </button>
          </div>
        </div>
      )}

      {/* DRAWING STATE - Bubble Grid */}
      {drawState === "drawing" && (
        <div className="flex flex-col items-center px-6 py-10">
          {/* Product preview small */}
          {drawItem.images.length > 0 && (
            <div className="relative mb-6 h-24 w-24 overflow-hidden bg-secondary">
              <Image
                src={drawItem.images[0]}
                alt={drawItem.itemName}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Grid */}
          <div className="grid w-full max-w-[280px] grid-cols-4 gap-2.5">
            {revealedCells.map((isRevealed, index) => (
              <button
                key={index}
                onClick={() => handleCellClick(index)}
                disabled={isRevealed}
                className={`relative aspect-square overflow-hidden rounded-full transition-all duration-300 ${
                  isRevealed
                    ? index === krunchCell
                      ? "scale-90 bg-foreground/10"
                      : "scale-90 bg-foreground/5"
                    : "bg-foreground shadow-[0_2px_8px_rgba(255,255,255,0.1)] hover:bg-foreground/90 active:scale-95"
                }`}
                aria-label={`Draw cell ${index + 1}`}
              >
                {isRevealed && index === krunchCell && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#f5c6d0]">
                    <span className="font-serif text-[10px] font-bold italic text-background">
                      Krunch
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>

          <p className="mt-6 text-[11px] text-muted-foreground">
            Tap the circles to reveal your draw
          </p>

          <button
            onClick={() => {
              const unrevealed = revealedCells
                .map((r, i) => (r ? -1 : i))
                .filter((i) => i >= 0)
              if (unrevealed.length > 0) {
                const randomIndex =
                  unrevealed[Math.floor(Math.random() * unrevealed.length)]
                handleCellClick(randomIndex)
              }
            }}
            className="mt-8 w-full max-w-[280px] bg-foreground py-4 text-center text-sm font-semibold tracking-[0.15em] uppercase text-background transition-opacity hover:opacity-90"
          >
            Click to Draw
          </button>
        </div>
      )}

      {/* WON STATE */}
      {drawState === "won" && (
        <div className="flex flex-col items-center px-6 py-14">
          {/* KRUNCH Logo Circle */}
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[#f5c6d0]">
            <span className="font-serif text-3xl font-bold italic text-background">
              Krunch
            </span>
          </div>

          <p className="mt-5 text-[10px] tracking-wide text-muted-foreground">
            {"*rare item obtained"}
          </p>
          <p className="mt-1 font-serif text-4xl font-bold text-foreground">
            {"Congrats!"}
          </p>

          <button
            onClick={handleOpenRare}
            className="mt-8 w-full max-w-xs border-2 border-foreground bg-foreground py-4 text-center text-sm font-semibold tracking-[0.15em] uppercase text-background transition-opacity hover:opacity-90"
          >
            Open rare item
          </button>

          {/* Item Info */}
          <div className="mt-10 w-full max-w-xs">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs italic text-muted-foreground underline underline-offset-2">
                  Artist
                </p>
                <p className="mt-1 text-sm font-bold text-foreground">
                  {drawItem.artist}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs italic text-muted-foreground underline underline-offset-2">
                  Dressed Date
                </p>
                <p className="mt-1 text-sm font-bold text-foreground">
                  {drawItem.dressedDate}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-xs italic text-muted-foreground underline underline-offset-2">
                  Offered Person
                </p>
                <p className="mt-1 text-xl font-bold tabular-nums text-foreground">
                  {formatKRW(drawItem.offeredPerson)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs italic text-muted-foreground underline underline-offset-2">
                  Price
                </p>
                <p className="mt-1 text-xl font-bold tabular-nums text-foreground">
                  KRW 100
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REVEAL STATE */}
      {drawState === "reveal" && (
        <div className="flex flex-col items-center px-5 py-8">
          <div className="relative aspect-[3/4] w-full max-w-xs overflow-hidden bg-secondary">
            {drawItem.images.length > 0 && (
              <Image
                src={drawItem.images[0]}
                alt={drawItem.itemName}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="font-serif text-lg font-bold italic leading-snug text-foreground">
                {"from "}
                {drawItem.artist}
              </p>
              <p className="font-serif text-lg font-bold italic leading-snug text-foreground">
                {": hidden Message"}
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="mt-6 w-full max-w-xs border border-border py-3.5 text-center text-xs font-semibold tracking-wide text-foreground transition-colors hover:bg-secondary"
          >
            Try Again
          </button>
        </div>
      )}

      <BottomNav />
    </main>
  )
}
