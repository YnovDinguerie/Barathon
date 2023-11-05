import { LoginInputs } from '@/types/auth/inputs'
import axios from 'axios'

type Data = {
  id: number
  email: string
  name: string
  token: string
}

export default async function loginUser(loginData: LoginInputs) {
  const response = await axios.post(
    'http://127.0.0.1:8000/api/login',
    loginData,
  )
  return response.data.data as Data
}
