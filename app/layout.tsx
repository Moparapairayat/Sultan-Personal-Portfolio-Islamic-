import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Amiri, Scheherazade_New } from "next/font/google"

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
})

const scheherazade = Scheherazade_New({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-scheherazade",
})

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${amiri.variable} ${scheherazade.variable}`}>
      <body>{children}</body>
    </html>
  )
}
