"use client"

import { getStory } from "@/api/news"
import { useQuery } from "@tanstack/react-query"
import React, { FC } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { formatTime } from "@/utils/formatTime"
import { Button } from "./ui/button"
import Link from "next/link"
import { ArrowUpRightIcon, ChevronUpIcon } from "lucide-react"
import { Badge } from "./ui/badge"

interface Props {
  id: number
}

export const NewsItem: FC<Props> = ({ id }) => {
  const { data } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => getStory(id),
  })

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>{formatTime(data?.time)}</CardDescription>
        <CardTitle>
          <Link href={"news/" + id}>{data?.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <a href={data?.url}>
            <Button>
              Источник
              <ArrowUpRightIcon size={20} />
            </Button>
          </a>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">{data?.by}</span>
            <Badge>{data?.score}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
