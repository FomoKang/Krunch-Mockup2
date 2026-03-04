"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"

const guideLinks = [
  { href: "#", label: "Inspection Standards" },
  { href: "#", label: "Terms of Use" },
  { href: "#", label: "Community Guidelines" },
]

const supportLinks = [
  { href: "#", label: "Notices" },
  { href: "#", label: "Store Guide" },
]

const mainLinks = [
  { href: "#", label: "Company" },
  { href: "#", label: "Careers" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Privacy Policy" },
]

const socialLinks = [
  { href: "#", label: "Instagram", icon: "instagram" },
  { href: "#", label: "Facebook", icon: "facebook" },
  { href: "#", label: "KakaoTalk", icon: "chat" },
]

export function Footer() {
  const [businessExpanded, setBusinessExpanded] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative border-t border-border bg-background py-8 pb-32 md:pb-8">
      <div className="mx-auto max-w-6xl px-4 lg:px-12">
        {/* Top: Guide / Customer Support */}
        <div className="grid grid-cols-2 gap-8 py-6 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-sm font-bold text-foreground">Guide</h3>
            <ul className="space-y-3">
              {guideLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold text-foreground">Customer Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border" />

        {/* Middle: Company, Careers, Terms, Privacy */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 py-6">
          {mainLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-bold text-foreground transition-colors hover:text-foreground/80"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="border-t border-border" />

        {/* Bottom: Social, Business Info */}
        <div className="flex flex-col gap-6 py-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-4">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground"
                aria-label={item.label}
              >
                <SocialIcon type={item.icon as "instagram" | "facebook" | "chat"} />
              </a>
            ))}
            <button
              type="button"
              onClick={() => setBusinessExpanded(!businessExpanded)}
              className="flex items-center gap-1 text-sm font-bold text-foreground"
            >
              Business Info
              <ChevronDown
                className={`h-4 w-4 transition-transform ${businessExpanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        {businessExpanded && (
          <div className="mb-6 rounded border border-border bg-muted/30 p-4 text-xs text-muted-foreground">
            <p>Company: Krunch Co., Ltd. | CEO: — | Business No: —</p>
            <p>Address: — | Tel: —</p>
          </div>
        )}

        <p className="text-center text-[11px] text-muted-foreground">
          © Krunch Corp.
        </p>
      </div>

      {/* Scroll to Top */}
      <button
        type="button"
        onClick={scrollToTop}
        className="fixed bottom-24 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-opacity hover:opacity-90 md:bottom-8"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5 text-foreground" />
      </button>
    </footer>
  )
}

function SocialIcon({ type }: { type: "instagram" | "facebook" | "chat" }) {
  if (type === "instagram") {
    return (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="1.5" fill="currentColor" />
      </svg>
    )
  }
  if (type === "facebook") {
    return (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    )
  }
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
