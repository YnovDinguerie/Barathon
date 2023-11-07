import { atomWithStorage } from 'jotai/utils'

export const userAtom = atomWithStorage('user', {
  email: '',
  token: '',
  name: '',
  birtdate: '',
})

export const toastAtom = atomWithStorage('toast', {
  status: '',
  msg: '',
  isVisible: false,
})
