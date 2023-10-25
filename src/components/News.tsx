"use client"

import React, { FC, useEffect, useState } from "react"
import { getNewStories } from "@/api/news"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { NewsItem } from "./NewsItem"
import { Button } from "./ui/button"
import { Loader } from "./Loader"

interface Props {}

export const News: FC<Props> = () => {
  const [loading, setLoading] = useState(true)

  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery({
    queryKey: ["new-stories"],
    queryFn: getNewStories,
    refetchInterval: 10000,
  })

  const storyIds = data?.slice(0, 100)

  const updateStories = () => {
    return queryClient.refetchQueries(["new-stories"])
  }

  useEffect(() => {
    if (isFetching === false) setLoading(false)
  }, [isFetching])

  return (
    <div className="flex w-full flex-col gap-4">
      <Loader open={loading} />
      <div className="flex justify-end">
        <Button onClick={updateStories}>Обновить новости</Button>
      </div>
      {storyIds?.map((item) => <NewsItem key={item} id={item} />)}
    </div>
  )
}
