import React, { FC } from "react"
import Link from "next/link"

interface Props {}

export const Header: FC<Props> = () => {
  return (
    <header className="w-full border-b border-gray-300 pb-4">
      <Link href="/">
        <span className="text-[24px] font-semibold">Hacker News 👾</span>
      </Link>
    </header>
  )
}
