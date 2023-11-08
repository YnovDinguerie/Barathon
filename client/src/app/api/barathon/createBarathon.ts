import { getBarathonsType } from '@/types/barathon/input'
import axios from 'axios'

type createBarathonType = {
  name: string
  time: string
  radius: number
  city: string
  token: string
}

export default async function createBarathon(barathonData: createBarathonType) {
  const token = barathonData.token
  const response = await axios.post(
    `http://127.0.0.1:8000/api/baratons`,
    barathonData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data.data as getBarathonsType
}
