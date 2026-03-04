"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"

const BANNERS = [
  { src: "/banner-kpop.png", alt: "IVE" },
  { src: "/banner-group.png", alt: "K-pop group" },
]

export function BannerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
    containScroll: "trimSnaps",
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

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
    <section className="px-4 py-4 lg:px-8">
      <div className="relative overflow-hidden lg:mx-auto lg:max-w-6xl">
        <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
          <div className="flex">
            {BANNERS.map((banner, i) => (
              <div
                key={i}
                className="relative min-w-0 flex-[0_0_100%] flex-shrink-0 px-0"
              >
                <div className="relative aspect-[21/12] w-full overflow-hidden rounded-2xl bg-secondary lg:aspect-[21/9] lg:max-h-[360px]">
                  <Image
                    src={banner.src}
                    alt={banner.alt}
                    fill
                    className="pointer-events-none select-none object-cover object-center lg:object-[center_30%]"
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 1152px"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 가로바 인디케이터 - 젠틀몬스터 스타일, 배너 하단 오버레이 */}
        {BANNERS.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
            <div className="flex h-0.5 items-center gap-1.5">
              {BANNERS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(idx)}
                  className={`h-0.5 shrink-0 rounded-full transition-all duration-300 ${
                    idx === selectedIndex
                      ? "w-6 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
