import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Providers from "./providers"
import { Header } from "@/components/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hacker News",
  description: "Hacker News clone built with Next.js and React Query",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="flex min-h-screen flex-col gap-8 p-4 md:px-24 md:py-8">
            <Header />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
