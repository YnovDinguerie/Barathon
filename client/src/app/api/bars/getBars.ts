import { BarType } from '@/types/barathon/input'
import axios from 'axios'

export default async function getBars({
  longitude,
  latitude,
  radius,
  token,
}: {
  longitude: number
  latitude: number
  radius: number
  token: string
}) {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/bars/${longitude}&${latitude}&${radius}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data.data as BarType[]
}
