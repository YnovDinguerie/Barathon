import { ProfileInfo } from '@/types/auth/inputs'
import axios from 'axios'

export default async function modifyUser(updateData: ProfileInfo) {
  const response = await axios.put(
    'http://127.0.0.1:8000/api/update-profile',
    updateData,
    {
      headers: {
        Authorization: `Bearer ${updateData.token}`,
      },
    },
  )
  return response.data.data
}
