"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AuctionPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/shop")
  }, [router])
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground">Redirecting...</p>
    </main>
  )
}
