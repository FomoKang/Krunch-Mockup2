import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { TopHeader } from "@/components/top-header"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "KRUNCH | Own That Moment",
  description: "KPOP Stage Costume Auction Platform",
  openGraph: {
    title: "KRUNCH | Own That Moment",
    description: "KPOP Stage Costume Auction Platform",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KRUNCH | Own That Moment",
    description: "KPOP Stage Costume Auction Platform",
  },
}

export const viewport: Viewport = {
  themeColor: "#fafafa",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <TopHeader />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
