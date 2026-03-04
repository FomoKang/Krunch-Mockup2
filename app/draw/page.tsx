"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import Image from "next/image"
import { Crown, Gem, Shield } from "lucide-react"
import { auctionItems, formatKRW } from "@/lib/data"
import { BottomNav } from "@/components/bottom-nav"

type DrawState = "ready" | "pulling" | "revealing" | "won" | "reveal" | "lost"

const RARE_CHANCE = 0.1
const SLIDER_END_RATIO = 0.9

const PEOPLE_JOINED = 14213
const WIN_RATE = "0.01%"
const K_POINT_BOOST = "X2"

const prizeTiers = [
  { label: "LEGENDARY", sub: "Artist Collection", Icon: Crown },
  { label: "UNIQUE", sub: "Signed Merch Pack", Icon: Gem },
  { label: "RARE", sub: "500 K-Points", Icon: Shield },
]

export default function DrawPage() {
  const [drawState, setDrawState] = useState<DrawState>("ready")
  const [sliderPos, setSliderPos] = useState(0)
  const [isRare, setIsRare] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 14, s: 37 })
  const trackRef = useRef<HTMLDivElement>(null)
  const sliderPosRef = useRef(0)
  const isDraggingRef = useRef(false)

  const drawItem = auctionItems.find((i) => i.isJustDropped) ?? auctionItems[0]

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev
        s--
        if (s < 0) {
          s = 59
          m--
          if (m < 0) {
            m = 59
            h = Math.max(0, h - 1)
          }
        }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const pad = (n: number) => String(n).padStart(2, "0")

  const updateSliderFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const padding = 16
    const circleSize = 44
    const maxPos = rect.width - padding * 2 - circleSize
    const rawPos = clientX - rect.left - padding
    const clamped = Math.max(0, Math.min(rawPos, maxPos))
    const ratio = maxPos > 0 ? clamped / maxPos : 0
    sliderPosRef.current = ratio
    setSliderPos(ratio)
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true
    setDrawState("pulling")
    trackRef.current?.setPointerCapture(e.pointerId)
    updateSliderFromClientX(e.clientX)
  }, [updateSliderFromClientX])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return
      updateSliderFromClientX(e.clientX)
    },
    [updateSliderFromClientX]
  )

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    trackRef.current?.releasePointerCapture(e.pointerId)
    if (!isDraggingRef.current) return
    isDraggingRef.current = false

    const reachedEnd = sliderPosRef.current >= SLIDER_END_RATIO
    setSliderPos(0)
    setDrawState("ready")
    sliderPosRef.current = 0

    if (reachedEnd) {
      setDrawState("revealing")
      const won = Math.random() < RARE_CHANCE
      setIsRare(won)
      setTimeout(() => setDrawState(won ? "won" : "lost"), 800)
    }
  }, [])

  const handlePointerCancel = useCallback((e: React.PointerEvent) => {
    try {
      trackRef.current?.releasePointerCapture(e.pointerId)
    } catch {}
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setSliderPos(0)
    setDrawState("ready")
    sliderPosRef.current = 0
  }, [])

  const handleOpenRare = () => setDrawState("reveal")
  const handleReset = () => setDrawState("ready")

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* READY + PULLING: New Draw layout */}
      {(drawState === "ready" || drawState === "pulling") && (
        <div className="flex flex-col px-4 pt-4">
          {/* Draw closes in */}
          <div className="mb-4 flex flex-col items-center">
            <div className="mb-3 flex w-full items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Draw Closes In
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <p className="font-mono text-3xl font-bold tabular-nums text-foreground">
              {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
            </p>
            <div className="mt-1 flex gap-6 text-[9px] uppercase tracking-wider text-muted-foreground">
              <span>Hours</span>
              <span>Min</span>
              <span>Sec</span>
            </div>
          </div>

          {/* Main card */}
          <div className="mb-6 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-secondary">
              {drawItem.images.length > 0 ? (
                <Image
                  src={drawItem.images[0]}
                  alt={drawItem.itemName}
                  fill
                  className="object-contain"
                />
              ) : (
                <span className="font-serif text-4xl font-bold text-muted-foreground/30">
                  {drawItem.artist.charAt(0)}
                </span>
              )}
              {/* People joined - top right */}
              <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-border bg-card/95 px-3 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-medium text-foreground">
                  {formatKRW(PEOPLE_JOINED)} People Joined
                </span>
              </div>
              <div className="absolute left-4 top-4 flex gap-1">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-foreground/30"
                  />
                ))}
              </div>
              <div className="absolute left-1/2 top-4 -translate-x-1/2">
                <span className="rounded-full bg-foreground px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-background">
                  Legend Drop
                </span>
              </div>
            </div>

            <div className="flex items-end justify-between border-t border-border px-4 py-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {drawItem.artist}
              </p>
              <p className="text-[10px] font-medium text-foreground">
                #{String(drawItem.demoDDay ?? 1).padStart(3, "0")}
              </p>
            </div>

            {/* PULL TO DRAW - 까만 바 + 손잡이, 오른쪽에 Pull 표시 (가려지지 않음) */}
            <div
              ref={trackRef}
              role="slider"
              tabIndex={0}
              aria-label="Pull to draw"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerCancel}
              onPointerCancel={handlePointerCancel}
              style={{ touchAction: "none" }}
              className="relative flex h-14 w-full select-none cursor-grab items-center border-t border-border px-4 active:cursor-grabbing"
            >
              {/* 까만 트랙 */}
              <div className="absolute inset-0 bg-foreground" />
              {/* 하얀 동그라미 - 손잡이 */}
              <div
                className="absolute top-1/2 z-10 h-11 w-11 -translate-y-1/2 cursor-grab rounded-full bg-white shadow-lg active:cursor-grabbing"
                style={{
                  left: `calc(1rem + ${sliderPos} * (100% - 4.75rem))`,
                }}
              />
              {/* Pull - 오른쪽에 고정 (손잡이 시작 위치에선 가려지지 않음) */}
              <span className="absolute right-4 top-1/2 z-0 -translate-y-1/2 text-[11px] font-medium uppercase tracking-wider text-white/90">
                Pull
              </span>
            </div>
          </div>

          {/* Win rate + K-Point */}
          <div className="mb-8 flex overflow-hidden rounded-xl border border-border">
            <div className="flex flex-1 flex-col items-center justify-center border-r border-border bg-card py-4">
              <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                Current Win Rate
              </p>
              <p className="mt-1 text-lg font-bold tabular-nums text-foreground">
                {WIN_RATE}
              </p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center bg-card py-4">
              <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                K-Point Boost
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {K_POINT_BOOST} <span className="text-sm font-normal italic">Given</span>
              </p>
            </div>
          </div>

          {/* Prize tiers */}
          <div className="mb-8">
            <div className="mb-4 flex justify-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Prize Tiers
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {prizeTiers.map(({ label, sub, Icon }) => (
                <div
                  key={label}
                  className="flex flex-col items-center rounded-xl border border-border bg-card p-4"
                >
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full border border-foreground/30">
                    <Icon className="h-3.5 w-3.5 text-foreground" strokeWidth={2} />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                    {label}
                  </p>
                  <p className="mt-0.5 text-[9px] text-muted-foreground">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* REVEALING - brief loading before result */}
      {drawState === "revealing" && (
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-6">
          <div className="h-16 w-16 animate-pulse rounded-full border-2 border-foreground" />
          <p className="mt-4 text-sm font-medium text-muted-foreground">
            Drawing...
          </p>
        </div>
      )}

      {/* WON STATE */}
      {drawState === "won" && (
        <div className="flex flex-col items-center px-6 py-14">
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[#f5c6d0]">
            <span className="font-serif text-3xl font-bold italic text-background">
              Krunch
            </span>
          </div>
          <p className="mt-5 text-[10px] text-muted-foreground">
            *rare item obtained
          </p>
          <p className="mt-1 font-serif text-4xl font-bold text-foreground">
            Congrats!
          </p>
          <button
            onClick={handleOpenRare}
            className="mt-8 w-full max-w-xs border-2 border-foreground bg-foreground py-4 text-center text-sm font-semibold uppercase tracking-[0.15em] text-background hover:opacity-90"
          >
            Open rare item
          </button>
          <div className="mt-10 w-full max-w-xs space-y-4">
            <div className="flex justify-between">
              <div>
                <p className="text-xs italic text-muted-foreground">Artist</p>
                <p className="mt-1 text-sm font-bold">{drawItem.artist}</p>
              </div>
              <div className="text-right">
                <p className="text-xs italic text-muted-foreground">Dressed Date</p>
                <p className="mt-1 text-sm font-bold">{drawItem.dressedDate}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-xs italic text-muted-foreground">Offered Person</p>
                <p className="mt-1 text-xl font-bold">{formatKRW(drawItem.offeredPerson)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs italic text-muted-foreground">Price</p>
                <p className="mt-1 text-xl font-bold">KRW 100</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REVEAL STATE - 당첨: 사진 */}
      {drawState === "reveal" && (
        <div className="flex flex-col items-center px-5 py-8">
          <div className="relative aspect-[3/4] w-full max-w-xs overflow-hidden rounded-xl bg-secondary">
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
                from {drawItem.artist}
              </p>
              <p className="font-serif text-lg font-bold italic leading-snug text-foreground">
                : hidden Message
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="mt-6 w-full max-w-xs border border-border py-3.5 text-center text-xs font-semibold tracking-wide text-foreground hover:bg-secondary"
          >
            Try Again
          </button>
        </div>
      )}

      {/* LOST STATE - 비당첨: 상품 이미지 회색 처리 */}
      {drawState === "lost" && (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
          <div className="relative aspect-[3/4] w-full max-w-xs overflow-hidden rounded-xl bg-muted">
            {drawItem.images.length > 0 ? (
              <Image
                src={drawItem.images[0]}
                alt={drawItem.itemName}
                fill
                className="object-cover grayscale opacity-50"
              />
            ) : null}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">Better luck next time</p>
          <button
            onClick={handleReset}
            className="mt-4 w-full max-w-xs border border-border py-3.5 text-center text-xs font-semibold tracking-wide text-foreground hover:bg-secondary"
          >
            Try Again
          </button>
        </div>
      )}

      <BottomNav />
    </main>
  )
}
