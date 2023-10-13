import { Inputs } from '@/types/auth/inputs'

export default async function postTodo(registerData: Inputs) {
  const result = await fetch('http://localhost:8000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData),
  })
  const data = await result.json()
  return data
}
