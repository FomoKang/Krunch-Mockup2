"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"

const BANNERS = [
  { src: "/banner-kpop.png", alt: "IVE" },
]

export function BannerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
  })
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

  if (BANNERS.length === 0) return null

  return (
    <section className="px-4 py-4 lg:px-6">
      <div className="relative overflow-hidden">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex touch-pan-x">
            {BANNERS.map((banner, i) => (
              <div
                key={i}
                className="min-w-0 flex-[0_0_100%] flex-shrink-0 px-0"
              >
                <div className="relative aspect-[21/12] w-full overflow-hidden rounded-2xl bg-secondary sm:aspect-[3/1.3] lg:aspect-[21/6.5]">
                  <Image
                    src={banner.src}
                    alt={banner.alt}
                    fill
                    className="object-cover object-center"
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {BANNERS.length > 1 && (
          <>
            <button
              type="button"
              onClick={scrollPrev}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/60 p-2 text-foreground backdrop-blur-sm hover:bg-background/80"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/60 p-2 text-foreground backdrop-blur-sm hover:bg-background/80"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="mt-3 flex justify-center gap-1.5">
              {BANNERS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i === selectedIndex ? "bg-foreground" : "bg-muted-foreground/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
