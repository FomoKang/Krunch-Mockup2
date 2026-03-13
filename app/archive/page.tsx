import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"
import {
  getArchiveEntityDisplayName,
  getArchiveEntitiesByCategory,
  getItemsByArchiveEntity,
} from "@/lib/data"

const sections = [
  {
    title: "Production Houses",
    eyebrow: "Atelier",
    entities: getArchiveEntitiesByCategory("atelier"),
  },
  {
    title: "Stylists",
    eyebrow: "Personal Portfolio",
    entities: getArchiveEntitiesByCategory("stylist"),
  },
] as const

export default function ArchiveIndexPage() {
  return (
    <main className="min-h-screen bg-background pb-24 pt-6">
      <header className="border-b border-border pb-6">
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Archive
        </p>
        <h1 className="mt-2 font-serif text-3xl text-foreground">
          Production and Stylist Portfolio
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Browse credited production houses and stylists, then open each portfolio
          page to see the outfits connected to them.
        </p>
      </header>

      <div className="space-y-10 pt-8">
        {sections.map((section) => (
          <section key={section.title}>
            <div className="mb-4 flex items-end justify-between border-b border-border/70 pb-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {section.eyebrow}
                </p>
                <h2 className="mt-1 font-serif text-2xl text-foreground">
                  {section.title}
                </h2>
              </div>
              <p className="text-xs text-muted-foreground">
                {section.entities.length}
                {" profiles"}
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {section.entities.map((entity) => {
                const itemCount = getItemsByArchiveEntity(entity.id).length

                return (
                  <Link
                    key={entity.id}
                    href={`/archive/${entity.id}`}
                    className="group flex items-center justify-between gap-4 border border-border bg-card px-4 py-4 transition-colors hover:border-foreground/30"
                  >
                    <div>
                      <p className="text-base font-semibold text-foreground">
                        {getArchiveEntityDisplayName(entity)}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {entity.description}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        {itemCount}
                        {" looks"}
                      </span>
                      <ArrowRight className="h-4 w-4 text-foreground transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <BottomNav />
    </main>
  )
}
