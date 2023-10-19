import { UpdatePasswordInputs } from '@/types/auth/inputs'
import axios from 'axios'

export default async function changePassword(
  updatePassword: UpdatePasswordInputs,
) {
  const response = await axios.post(
    'http://127.0.0.1:8000/api/login',
    updatePassword,
  )
  return response
}
