"use client"

import { Clock3, Sparkles } from "lucide-react"
import { BottomNav } from "@/components/bottom-nav"

export default function SecondMarketPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-[#c89347]/20 blur-3xl" />
        <div className="absolute -right-24 top-32 h-72 w-72 rounded-full bg-[#26635b]/15 blur-3xl" />
      </div>

      <section className="relative flex min-h-[calc(100vh-96px)] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-border/60 bg-card/80 p-8 text-center shadow-[0_20px_60px_-35px_rgba(0,0,0,0.45)] backdrop-blur-sm">
          <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">second market</p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-none tracking-tight text-foreground">
            Coming soon
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            We are crafting a cleaner and sharper second market experience.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2.5 text-xs text-foreground">
            <Clock3 className="h-3.5 w-3.5" />
            Premium resale zone is under preparation.
          </div>

          <div className="mt-4 inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            New feature teaser
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  )
}
