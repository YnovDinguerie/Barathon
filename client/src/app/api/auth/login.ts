import { LoginInputs } from '@/types/auth/inputs'
import axios from 'axios'
import config from '../config'

type Data = {
  id: number
  email: string
  name: string
  token: string
  birthdate: string
}

export default async function loginUser(loginData: LoginInputs) {
  const url = `${config.backendApiUrl}/login`
  const response = await axios.post(url, loginData)
  return response.data.data as Data
}
