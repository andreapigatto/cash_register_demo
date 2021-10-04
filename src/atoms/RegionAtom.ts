import { atom } from 'recoil'
import { Selected } from '../types'

const regionAtom = atom<Selected>({
  key: 'regionAtom',
  default: { value: 'UK', label: 'UK' },
})

export default regionAtom
