import dayjs from "dayjs"

export const formatTime = (value: number | undefined) => {
  if (!value) return ""
  return dayjs.unix(value).format("DD.MM.YY HH:mm")
}
