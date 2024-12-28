"use client"
import { getQueryClient } from "@/services"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { FC, PropsWithChildren } from "react"

export const TanstackQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = getQueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}
