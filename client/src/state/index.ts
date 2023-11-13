import { atomWithStorage } from 'jotai/utils'

export const userAtom = atomWithStorage('user', {
  email: '',
  token: '',
  name: '',
  birthdate: '',
})

export const toastAtom = atomWithStorage('toast', {
  status: '',
  msg: '',
  isVisible: false,
})
