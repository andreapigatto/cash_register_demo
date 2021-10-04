import { Items, Regions } from './types'

export const items: { item: Items; price: number }[] = [
  {
    item: 'A',
    price: 50,
  },
  {
    item: 'B',
    price: 30,
  },
  {
    item: 'C',
    price: 20,
  },
  {
    item: 'D',
    price: 15,
  },
]

export const rules = [
  {
    item: 'A',
    count: 3,
    price: 130,
  },
  {
    item: 'B',
    count: 2,
    price: 45,
  },
]

export const bag: {
  maxItems: number
  price: Record<Regions, number>
} = {
  maxItems: 5,
  price: {
    UK: 5,
    Wales: 10,
  },
}
