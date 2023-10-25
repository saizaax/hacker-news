"use client"

import { getComment } from "@/api/news"
import { formatTime } from "@/utils/formatTime"
import { useQuery } from "@tanstack/react-query"
import React, { FC, useState } from "react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { CommentKid } from "./CommentKid"
import { decode } from "html-entities"

interface Props {
  id: number
}

export const Comment: FC<Props> = ({ id }) => {
  const { data } = useQuery({
    queryKey: ["comment", id],
    queryFn: async () => getComment(id),
  })

  const [showKids, setShowKids] = useState(false)

  const comment = data?.text
    ? decode(data?.text).replace(/(<([^>]+)>)/gi, "")
    : ""

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 p-3">
      <div className="flex items-center justify-between">
        <Badge variant="secondary">{data?.by}</Badge>
        <span className="text-[14px] font-normal opacity-60">
          {formatTime(data?.time)}
        </span>
      </div>
      <p className="overflow-hidden break-words text-[14px] text-gray-800">
        {comment}
      </p>
      {!showKids && data?.kids && data?.kids?.length > 0 && (
        <div className="flex flex-col items-end">
          <Button size="sm" onClick={() => setShowKids(true)}>
            Загрузить ответы
          </Button>
        </div>
      )}
      {showKids && data?.kids && data?.kids?.length > 0 && (
        <div className="flex flex-col gap-2">
          {data?.kids?.map((kid) => <CommentKid key={kid} id={kid} />)}
        </div>
      )}
    </div>
  )
}
