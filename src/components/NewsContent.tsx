"use client"

import React, { FC } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getStory } from "@/api/news"
import { formatTime } from "@/utils/formatTime"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import Link from "next/link"
import { ArrowUpRightIcon, ChevronLeftIcon } from "lucide-react"
import { Comment } from "./Comment"

interface Props {
  id: number
}

export const NewsContent: FC<Props> = ({ id }) => {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => getStory(id),
  })

  const updateComments = () => {
    queryClient.refetchQueries(["story", id])
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <Link
        href="/"
        className="flex items-center gap-2 text-gray-600 hover:opacity-80"
      >
        <ChevronLeftIcon /> Назад к новостям
      </Link>
      <div className="flex flex-col py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <Badge>{data?.score}</Badge>
            <span>{data?.by}</span>
            <span>•</span>
            <span>{formatTime(data?.time)}</span>
          </div>
          <a
            href={data?.url}
            className="hidden w-fit items-center gap-1 rounded-md border border-gray-400 px-2 py-[2px] text-gray-500 hover:opacity-80 md:flex"
          >
            Источник
            <ArrowUpRightIcon size={20} />
          </a>
        </div>
        <h1 className="text-[28px] font-semibold">{data?.title}</h1>
        <a
          href={data?.url}
          className="mt-2 flex w-fit items-center gap-1 rounded-md border border-gray-400 px-2 py-[2px] text-gray-500 hover:opacity-80 md:hidden"
        >
          Источник
          <ArrowUpRightIcon size={20} />
        </a>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-1">
            <span className="text-[18px] text-gray-600">Комментарии</span>
            <Badge>{data?.descendants}</Badge>
          </div>
          <hr className="flex h-[1px] flex-1 border-none bg-gray-300" />
          <Button onClick={updateComments}>Обновить</Button>
        </div>
        <div className="flex flex-col gap-3">
          {data?.kids?.map((id: number) => <Comment id={id} key={id} />)}
        </div>
      </div>
    </div>
  )
}
