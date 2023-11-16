import { createBarathonType } from '@/types/barathon/input'
import axios from 'axios'
import addBarToBarathonBars from '../bars/addBarToBarathon'

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
  ).then((response) => {
    barathonData.barathonBars.map((bar) => {
      addBarToBarathonBars({
        barathonId: response.data.data.id,
        barId: bar.id.toString(),
        token: token,
      })
    })
  })
  return
}
