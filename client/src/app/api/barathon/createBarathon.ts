import { createBarathonType } from '@/types/barathon/input'
import axios from 'axios'

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
  return response.data.data
}
