"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Gavel, Gift, ShoppingBag, User } from "lucide-react"

const navItems: { href: string; label: string; icon: typeof Home; hideOnMobile?: boolean }[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/auction", label: "Auction", icon: Gavel },
  { href: "/draw", label: "Draw", icon: Gift },
  { href: "/second-market", label: "2nd Market", icon: ShoppingBag, hideOnMobile: true },
  { href: "/profile", label: "Profile", icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md md:hidden"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
        {navItems.filter((item) => !item.hideOnMobile).map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 text-[10px] transition-colors ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/70"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="h-5 w-5" strokeWidth={isActive ? 2 : 1.5} />
              <span className={`whitespace-nowrap tracking-wide ${isActive ? "font-semibold" : "font-normal"}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
