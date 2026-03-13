import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import {
  formatKRW,
  getArchiveEntityById,
  getArchiveEntityDisplayName,
  getItemsByArchiveEntity,
  getItemCredits,
} from "@/lib/data"

function categoryLabel(category: "brand" | "atelier" | "stylist") {
  switch (category) {
    case "brand":
      return "Brand Archive"
    case "atelier":
      return "Production Archive"
    case "stylist":
      return "Stylist Archive"
  }
}

export default async function ArchivePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const entity = getArchiveEntityById(id)

  if (!entity) {
    notFound()
  }

  const items = getItemsByArchiveEntity(entity.id)

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8">
        <header className="border-b border-border pb-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {categoryLabel(entity.category)}
          </p>
          <h1 className="mt-2 font-serif text-3xl text-foreground">
            {getArchiveEntityDisplayName(entity)}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {entity.description}
          </p>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const previewImage = item.images[0]
            const collaborators = getItemCredits(item).filter(
              (credit) => credit.entityId !== entity.id && credit.role !== "brand"
            )

            return (
              <Link
                key={item.id}
                href={`/item/${item.id}`}
                className="group overflow-hidden border border-border bg-card transition-colors hover:border-foreground/25"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-white">
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt={item.itemName}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      No image
                    </div>
                  )}
                </div>

                <div className="space-y-3 p-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {item.artist}
                    </p>
                    <h2 className="mt-1 text-base font-semibold text-foreground">
                      {item.itemName}
                    </h2>
                    {item.eventName && (
                      <p className="mt-1 text-sm text-muted-foreground">{item.eventName}</p>
                    )}
                  </div>

                  {collaborators.length > 0 && (
                    <div className="border-t border-border/70 pt-3">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        Collaborators
                      </p>
                      <p className="mt-2 text-sm text-foreground">
                        {collaborators
                          .map((credit) => getArchiveEntityDisplayName(credit.entity))
                          .join(" / ")}
                      </p>
                    </div>
                  )}

                  <div className="flex items-end justify-between border-t border-border/70 pt-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        Top Offer
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        KRW {formatKRW(item.topOffer)}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.dressedDate}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </section>
      </div>
      <BottomNav />
    </main>
  )
}
