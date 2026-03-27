import type React from "react"
import type { Metadata } from "next"
import { Barlow } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import CustomCursor from "@/components/CustomCursor"
import "./globals.css"

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
})

const gesstwo = localFont({
  src: [
    {
      path: "./Ge ss two/GE SS Two Light_0.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Ge ss two/GE SS Two Medium_0.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Ge ss two/GE SS Two Bold_New.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gess",
})

export const metadata: Metadata = {
  title: "Vertex Media - Premium Social Media Agency",
  description: "Elevating Digital Experiences. A premium social media agency based in Doha, Qatar.",
  generator: "v0.app",
  icons: {
    icon: "/logo (1).svg",
    apple: "/logo (1).svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} ${gesstwo.variable} antialiased`}>
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

