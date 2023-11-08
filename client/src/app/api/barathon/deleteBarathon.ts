import axios from 'axios'

export default async function deleteBarathon({
  id,
  token,
}: {
  id: string
  token: string
}) {
  const response = await axios.delete(
    `http://127.0.0.1:8000/api/baratons/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data.data
}
