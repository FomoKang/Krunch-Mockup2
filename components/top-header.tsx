"use client"

import Link from "next/link"

const mainNav: { href: string; label: string; hideOnMobile?: boolean }[] = [
  { href: "/", label: "HOME" },
  { href: "/auction", label: "AUCTION" },
  { href: "/draw", label: "DRAW" },
  { href: "/second-market", label: "2ND MARKET", hideOnMobile: true },
]

export function TopHeader() {
  return (
    <header className="sticky top-0 z-40 flex min-h-14 shrink-0 items-center border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-12">
        <Link href="/" className="flex-shrink-0">
          <span className="font-serif text-[1.4625rem] font-bold tracking-tight text-foreground sm:text-[1.625rem]">
            KRUNCH
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-4">
          <nav className="flex items-center gap-3 whitespace-nowrap md:gap-6" aria-label="Main navigation">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap text-[11px] font-bold tracking-wide text-foreground hover:text-foreground/80 ${
                  item.hideOnMobile ? "hidden md:inline" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 border-l border-border pl-4">
            <Link
              href="/profile"
              className="whitespace-nowrap text-[10px] text-muted-foreground hover:text-foreground/80"
            >
              My Page
            </Link>
            <Link
              href="/profile"
              className="whitespace-nowrap text-[10px] text-muted-foreground hover:text-foreground/80"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
