import { LoginInputs } from '@/types/auth/inputs'
import axios from 'axios'

export default async function loginUser(loginData: LoginInputs) {
  const response = await axios.post(
    'http://127.0.0.1:8000/api/login',
    loginData,
  )
  return response
}
