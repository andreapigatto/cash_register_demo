import { atom } from 'recoil'
import { Items } from '../types'

const orderAtom = atom<{
  itemsList:
    | {
        item: Items
        price: number
      }[]
    | null
  total: number
  currency: 'GPB'
} | null>({
  key: 'orderAtom',
  default: null,
})

export default orderAtom
