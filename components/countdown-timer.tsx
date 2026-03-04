"use client"

import { useState, useEffect } from "react"
import { getTimeRemaining } from "@/lib/data"

interface CountdownTimerProps {
  expirationDate: string
  variant?: "large" | "compact"
}

export function CountdownTimer({ expirationDate, variant = "large" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(expirationDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(expirationDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [expirationDate])

  const pad = (n: number) => String(n).padStart(2, "0")

  const padDay = (n: number) => String(n).padStart(2, "0")
  const dDay =
    timeLeft.days > 0
      ? `D-${padDay(timeLeft.days)}`
      : timeLeft.total > 0
        ? `${timeLeft.hours}h ${timeLeft.minutes}m`
        : "종료"

  const units = [
    { label: "Day", value: pad(timeLeft.days) },
    { label: "Hour", value: pad(timeLeft.hours) },
    { label: "Min", value: pad(timeLeft.minutes) },
    { label: "Sec", value: pad(timeLeft.seconds) },
  ]

  if (variant === "compact") {
    return (
      <div className="flex flex-col gap-1.5">
        <p className="text-xs italic text-muted-foreground underline underline-offset-2">
          Until Expiration
        </p>
        <div className="flex items-baseline gap-4">
          {units.map((unit) => (
            <div key={unit.label} className="flex flex-col items-center gap-0.5">
              <span className="text-[10px] tracking-wide text-muted-foreground">
                {unit.label}
              </span>
              <span className="border-b border-foreground/30 pb-1 font-serif text-2xl font-bold tabular-nums text-foreground">
                {unit.value}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground">{dDay}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm italic font-medium text-foreground underline underline-offset-4">
        Until Expiration
      </p>
      <div className="flex items-baseline gap-5">
        {units.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center gap-1">
            <span className="text-xs tracking-wide text-muted-foreground">{unit.label}</span>
            <span className="border-b-2 border-foreground/40 pb-1 font-serif text-5xl font-bold tabular-nums text-foreground">
              {unit.value}
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{dDay}</p>
    </div>
  )
}
