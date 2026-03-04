"use client"

import { BottomNav } from "@/components/bottom-nav"
import { User, Settings, CreditCard, Heart, Package, ChevronRight, LogIn } from "lucide-react"

const menuItems = [
  { label: "My Bids", icon: CreditCard, count: 3 },
  { label: "Saved Items", icon: Heart, count: 12 },
  { label: "Won Items", icon: Package, count: 1 },
  { label: "Settings", icon: Settings },
]

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Profile Header */}
      <div className="flex flex-col items-center pt-10 pb-8">
        <div className="flex h-20 w-20 items-center justify-center border border-border bg-secondary">
          <User className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <p className="mt-4 font-serif text-xl font-bold text-foreground">Guest</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Sign in to start bidding
        </p>
        <button className="mt-5 flex items-center gap-2 bg-foreground px-8 py-3 text-xs font-semibold tracking-[0.15em] uppercase text-background transition-opacity hover:opacity-90">
          <LogIn className="h-3.5 w-3.5" />
          Sign In
        </button>
      </div>

      {/* Menu */}
      <div className="border-t border-border">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-3.5 border-b border-border/50 px-0 py-4 transition-colors hover:bg-secondary/50"
          >
            <item.icon className="h-4.5 w-4.5 text-muted-foreground" />
            <div className="flex flex-1 flex-col items-start">
              <span className="text-sm text-foreground">{item.label}</span>
            </div>
            {item.count !== undefined && (
              <span className="min-w-[24px] text-center text-xs font-bold tabular-nums text-foreground">
                {item.count}
              </span>
            )}
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
          </button>
        ))}
      </div>

      {/* Footer Branding */}
      <div className="mt-16 flex flex-col items-center">
        <p className="font-serif text-3xl font-bold tracking-tighter text-foreground">
          KRUNCH
        </p>
        <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
          Own That Moment
        </p>
        <div className="mt-4 h-px w-12 bg-border" />
        <p className="mt-4 text-[10px] leading-relaxed text-muted-foreground/50">
          KPOP Stage Costume Auction Platform
        </p>
      </div>

      <BottomNav />
    </main>
  )
}
