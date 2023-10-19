import { ResetPasswordInputs } from '@/types/auth/inputs'
import axios from 'axios'

export default async function resetPassword(resetData: ResetPasswordInputs) {
  const response = await axios.post(
    'http://127.0.0.1:8000/api/send-password-reset-email',
    resetData,
  )
  return response
}
