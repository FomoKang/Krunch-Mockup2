"use client"

import { BottomNav } from "@/components/bottom-nav"

export default function SecondMarketPage() {
  return (
    <main className="min-h-screen bg-background pb-24">
      <header className="px-5 pt-6 pb-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          2nd market
        </p>
        <h1 className="mt-1 font-serif text-2xl font-bold text-foreground">
          2nd Market
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Coming soon
        </p>
      </header>
      <BottomNav />
    </main>
  )
}
