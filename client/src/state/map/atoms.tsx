import { atom } from 'jotai'

export const latitudeAtom = atom<number>(0)
export const longitudeAtom = atom<number>(0)
export const radiusAtom = atom<number>(5)
export const barsToVisitAtom = atom<number>(5)
export const resizeMapAtom = atom<boolean>(false)
