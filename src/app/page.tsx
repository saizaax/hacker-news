import getQueryClient from "./getQueryClient"
import { Hydrate, dehydrate } from "@tanstack/react-query"
import { getNewStories, getStory } from "@/api/news"
import { News } from "@/components/News"

export const revalidate = 60

export default async function Home() {
  const queryClient = getQueryClient()
  const stories = await queryClient.fetchQuery(["new-stories"], getNewStories)

  const fetchStories = async () => {
    if (!stories) return

    await Promise.allSettled(
      stories
        ?.slice(0, 100)
        .map((id) => queryClient.fetchQuery(["story", id], () => getStory(id))),
    )
  }

  await fetchStories()
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <News />
    </Hydrate>
  )
}
