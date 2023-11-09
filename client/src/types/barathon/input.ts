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

export type GetBarathonInput = {
  name: string
  time: string
  radius: string
  city: string
}

export type createBarathonType = {
  name: string
  time: string
  radius: number
  city: string
  token: string
}

export type BarType = {
  id: number
  name: string
  longitude: string
  latitude: string
  website: null
  phone: null
  opening_hours: null
  wheelchair: null
  created_at: null
  updated_at: null
  distance: number
}
