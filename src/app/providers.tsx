"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

export default function Providers({ children }: { children: React.ReactNode }) {
  const defaultConfig = {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }

  const [queryClient] = useState(() => new QueryClient(defaultConfig))

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
