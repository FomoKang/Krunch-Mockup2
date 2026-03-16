"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogIn, User } from "lucide-react"

const mainNav: { href: string; label: string; hideOnMobile?: boolean }[] = [
  { href: "/", label: "HOME" },
  { href: "/auction", label: "AUCTION" },
  { href: "/draw", label: "DRAW" },
  { href: "/archive", label: "ARCHIVE" },
  { href: "/second-market", label: "2ND MARKET", hideOnMobile: true },
]

export function TopHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 min-h-14 shrink-0 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto grid w-full max-w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 lg:max-w-6xl lg:px-12">
        <Link href="/" className="flex-shrink-0">
          <span className="font-serif text-[1.4625rem] font-bold tracking-tight text-foreground sm:text-[1.625rem]">
            KRUNCH
          </span>
        </Link>

        <nav
          className="min-w-0"
          aria-label="Main navigation"
        >
          <div className="-mx-2 flex items-center gap-2 overflow-x-auto px-2 scrollbar-hide snap-x snap-mandatory">
            {mainNav.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`snap-start whitespace-nowrap border-b-2 px-1 py-1 text-[11px] font-bold tracking-wide transition-colors ${
                    item.hideOnMobile ? "hidden md:inline" : ""
                  } ${
                    isActive
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground/80"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="flex items-center gap-2 border-l border-border pl-3 sm:gap-3 sm:pl-4">
          <Link
            href="/profile"
            className="flex items-center gap-1 whitespace-nowrap text-[10px] text-muted-foreground hover:text-foreground/80"
            aria-label="My Page"
          >
            <User className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:inline">My Page</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-1 whitespace-nowrap text-[10px] text-muted-foreground hover:text-foreground/80"
            aria-label="Log in"
          >
            <LogIn className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:inline">Log in</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
