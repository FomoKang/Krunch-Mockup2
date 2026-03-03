"use client"

import { useState, useRef } from "react"
import { formatKRW } from "@/lib/data"

interface OfferInputProps {
  onSubmit: (amount: number) => void
}

export function OfferInput({ onSubmit }: OfferInputProps) {
  const [value, setValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "")
    if (raw.length <= 12) {
      setValue(raw)
    }
  }

  const displayValue = value ? formatKRW(Number(value)) : ""

  const handleSubmit = () => {
    if (value && Number(value) > 0) {
      onSubmit(Number(value))
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-sm italic font-medium text-foreground underline underline-offset-4">
          Your Offer
        </p>
        <div className="mt-3 flex flex-col gap-1">
          <span className="text-xl font-bold tracking-tight text-foreground">KRW</span>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              value={displayValue}
              onChange={handleChange}
              placeholder="0"
              className="w-full border-b-2 border-foreground bg-transparent py-2 font-serif text-4xl font-bold tabular-nums text-foreground placeholder:text-muted-foreground/20 focus:outline-none"
              aria-label="Enter your offer amount in KRW"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        disabled={!value || Number(value) <= 0}
        className="w-full bg-foreground py-4 text-center text-sm font-semibold tracking-[0.15em] uppercase text-background transition-opacity hover:opacity-90 disabled:opacity-20 disabled:cursor-not-allowed"
      >
        Set Offer
      </button>
    </div>
  )
}
