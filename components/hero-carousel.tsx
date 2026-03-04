"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import type { AuctionItem } from "@/lib/data"

interface HeroCarouselProps {
  items: AuctionItem[]
}

export function HeroCarousel({ items }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    return () => emblaApi.off("select", onSelect)
  }, [emblaApi, onSelect])

  const featuredItems = items.filter((i) => i.images.length > 0)
  if (featuredItems.length === 0) return null

  return (
    <section className="flex h-[33vh] min-h-[140px] flex-col border-b border-border bg-secondary/30">
      <div className="relative mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col justify-center px-4 py-3">
        <div ref={emblaRef} className="min-h-0 flex-1 overflow-hidden">
          <div className="flex">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="min-w-0 flex-[0_0_100%] px-2"
              >
                <Link
                  href={`/item/${item.id}`}
                  className="flex h-full max-h-full flex-col gap-2 overflow-hidden rounded-lg border border-border bg-card p-3 transition-colors hover:border-foreground/20 lg:flex-row lg:items-center lg:gap-4 lg:p-5"
                >
                  <div className="flex flex-1 flex-col justify-center lg:min-w-[180px]">
                    <p className="font-serif text-lg font-bold leading-tight tracking-tight text-foreground lg:text-xl">
                      {item.artist}
                    </p>
                    <p className="mt-0.5 font-serif text-sm font-bold italic leading-tight text-foreground/90 lg:text-base">
                      {item.itemName}
                    </p>
                    <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                      {item.descriptionKo || item.description}
                    </p>
                  </div>
                  <div className="relative h-[22vh] min-h-[80px] w-[22vh] min-w-[80px] shrink-0 overflow-hidden rounded-lg bg-secondary lg:h-[12vh] lg:min-h-[90px] lg:w-[12vh] lg:min-w-[90px]">
                    <Image
                      src={item.images[0]}
                      alt={item.itemName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                      priority
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          type="button"
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground lg:left-2"
          aria-label="Previous"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground lg:right-2"
          aria-label="Next"
        >
          <ChevronRight className="h-8 w-8" />
        </button>

        {/* Pagination */}
        <div className="mt-1 flex shrink-0 justify-end pr-2">
          <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
            {selectedIndex + 1}/{featuredItems.length}{" "}
            <button
              type="button"
              onClick={scrollNext}
              className="ml-1 inline-block hover:text-foreground"
              aria-label="Next"
            >
              &gt;
            </button>
          </span>
        </div>
      </div>
    </section>
  )
}
