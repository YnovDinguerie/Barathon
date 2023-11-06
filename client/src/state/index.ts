import { atomWithStorage } from 'jotai/utils'

export const userAtom = atomWithStorage('user', {
  email: '',
  token: '',
  name: '',
})

export const toastAtom = atomWithStorage('toast', {
  status: '',
  msg: '',
  isVisible: false,
})
