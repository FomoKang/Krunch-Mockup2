"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function GachaPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/draw")
  }, [router])
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground">Redirecting...</p>
    </main>
  )
}
