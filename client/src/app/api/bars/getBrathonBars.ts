import axios from 'axios'

export default async function getBarathonBars({
  id,
  token,
}: {
  id: string
  token: string
}) {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/baratons/${id}/bars`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data.data
}
