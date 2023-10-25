import { getComment, getNewStories, getStory } from "@/api/news"
import getQueryClient from "@/app/getQueryClient"
import { NewsContent } from "@/components/NewsContent"
import { Hydrate, dehydrate, useQuery } from "@tanstack/react-query"
import { NextPage, NextPageContext } from "next"

interface NewsPageProps {
  params: {
    id: string
  }
}

export const revalidate = 60

export async function generateStaticParams() {
  const queryClient = getQueryClient()
  const stories = await queryClient.fetchQuery(["new-stories"], getNewStories)

  return stories?.slice(0, 100)?.map((id: number) => ({ id: String(id) }))
}

const NewsPage: NextPage<NewsPageProps> = async ({ params }) => {
  const id = Number(params?.id)

  const queryClient = getQueryClient()
  const story = await queryClient.fetchQuery(["story", id], () => getStory(id))

  const fetchComments = async () => {
    if (!story?.kids) return

    await Promise.allSettled(
      story?.kids?.map((id) =>
        queryClient.fetchQuery(["comment", id], () => getComment(id)),
      ),
    )
  }

  await fetchComments()
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <main className="flex w-full">
        <NewsContent id={id} />
      </main>
    </Hydrate>
  )
}

export default NewsPage
