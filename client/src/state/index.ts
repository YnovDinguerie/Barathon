import { atomWithStorage } from 'jotai/utils'

export const userAtom = atomWithStorage('user', {
  email: '',
  token: '',
  name: '',
})
