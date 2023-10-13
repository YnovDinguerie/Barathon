import { Inputs } from '@/types/auth/inputs'

export default async function postTodo(registerData: Inputs) {
  console.log(registerData)
  const result = await fetch('http://127.0.0.1:8000/api/register', {
    method: 'POST',
    body: JSON.stringify(registerData),
  })
  const data = await result.json()
  return data
}
