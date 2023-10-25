import { API } from "./api"

interface Story {
  by: string
  descendants: number
  id: number
  kids: number[]
  score: number
  time: number
  title: string
  type: string
  url: string
}

interface Comment {
  by: string
  id: number
  kids: number[]
  parent: number
  text: string
  time: number
  type: string
}

export const getNewStories = async () => {
  const response = await API.get<number[]>("/v0/newstories.json")
  return response?.data
}

export const getStory = async (id: number) => {
  const response = await API.get<Story>(`/v0/item/${id}.json`)
  return response?.data
}

export const getComment = async (id: number) => {
  const response = await API.get<Comment>(`/v0/item/${id}.json`)
  return response?.data
}
