import axios from 'axios'

export default async function getBarathonBars({ id }: { id: string }) {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/baratons/${id}/bars`,
    {
      headers: {
        Authorization: `Bearer 2|WwySVk0ZuTGi4ZQ6De0QhXqAV8oV4sf9WWjDocEV1cd5291c`,
      },
    },
  )
  return response.data.data
}
