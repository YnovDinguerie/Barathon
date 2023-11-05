import { getBarathonsType } from '@/types/barathon/input'
import axios from 'axios'

export default async function getBarathons({
  userToken,
}: {
  userToken: string
}) {
  const response = await axios.get('http://127.0.0.1:8000/api/baratons', {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  })
  return response.data.data as getBarathonsType[]
}
