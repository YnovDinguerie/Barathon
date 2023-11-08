export type getBarathonsType = {
  id: number
  user_id: number
  name: string
  time: string
  radius: string
  city: string
  created_at: string
  updated_at: string
}

export type createBarathonType = {
  name: string
  time: string
  radius: number
  city: string
  token: string
}
