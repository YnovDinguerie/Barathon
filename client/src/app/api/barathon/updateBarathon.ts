import { GetBarathonInput } from '@/types/barathon/input'
import axios from 'axios'

export default async function updateBarathon(
  barathonData: GetBarathonInput,
  token: string,
  id: string,
) {
  const response = await axios.put(
    `http://127.0.0.1:8000/api/baratons/${id}`,
    barathonData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data.data
}
