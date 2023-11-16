import axios from 'axios'

export default async function addBarToBarathonBars({
  barathonId,
  barId,
  token,
}: {
  barathonId: string
  barId: string
  token: string
}) {
  const response = await axios.post(
    `http://127.0.0.1:8000/api/baraton-bars`,
    {
      baraton_id: barathonId,
      bar_id: barId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data.data
}
