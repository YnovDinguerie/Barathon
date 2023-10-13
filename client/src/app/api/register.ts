import { Inputs } from '@/types/auth/inputs'
import axios from 'axios'

export default async function postTodo(registerData: Inputs) {
  const response = await axios.post(
    'http://127.0.0.1:8000/api/register',
    registerData,
  )
  return response
}
