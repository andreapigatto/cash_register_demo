import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { useHistory } from 'react-router-dom'

import Layout from '../Layout/Layout'
import Item from '../components/Item/Item'
import Button from '../components/Button/Button'

import { Sizes, Toppings } from '../types'
import orderAtom from '../atoms/OrderAtom'

function Menu(): JSX.Element {
  const [sizeSelected, setSizeSelected] = useState<Sizes | ''>('')
  const [toppingSelected, setToppingSelected] = useState<Toppings[]>([])
  const [total, setTotal] = useState(0)
  const [overview, setOverview] = useState<{
    pizzaList: { size: Sizes; toppings: Toppings[] }[]
    price: number
    currency: 'USD' | 'EUR'
  } | null>(null)
  const [resetClicked, setResetClicked] = useState(false)
  const [order, setOrder] = useRecoilState(orderAtom)

  const history = useHistory()

  function onSizeClicked(name: Sizes | Toppings, price: number) {
    setSizeSelected(name as Sizes)
    setTotal(overview ? overview.price + price : price)
    setToppingSelected([])
  }

  function onToppingClicked(name: Sizes | Toppings, price: number) {
    const toppingList = toppingSelected
    toppingList.push(name as Toppings)

    setToppingSelected(toppingList)
    setTotal(total + price)
  }

  function onAddClicked() {
    const pizzaListNew = overview ? overview.pizzaList : []
    pizzaListNew.push({
      size: sizeSelected as Sizes,
      toppings: toppingSelected,
    })
    setOverview({
      pizzaList: pizzaListNew,
      price: total,
      currency: 'USD',
    })

    setSizeSelected('')
    setToppingSelected([])
    setResetClicked(!resetClicked)
  }

  function onResetClicked() {
    setSizeSelected('')
    setToppingSelected([])
    setTotal(overview ? overview.price : 0)
    setResetClicked(!resetClicked)
  }

  function onResetCartClicked() {
    setSizeSelected('')
    setToppingSelected([])
    setTotal(0)
    setOverview(null)
    setResetClicked(!resetClicked)
  }

  function onCheckoutClicked() {
    setOrder({ ...order, order: overview })
    history.push('/checkout')
  }

  return (
    <Layout prevButton={{ route: '/' }}>
      <div
        className={`grid ${overview ? 'md:grid-cols-2' : ''}`}
        data-test="menu-container"
      >
        <div className="px-8 text-center">
          <p className="text-right text-lg mb-8">{`Total: ${total}$`}</p>
          <p className="mb-8">Choose one of the pizza Sizes:</p>
          <div className="flex flex-col items-center">
            <Item
              name="small"
              price={15}
              callback={onSizeClicked}
              selected={sizeSelected === 'small'}
            />
            <Item
              name="medium"
              price={20}
              callback={onSizeClicked}
              selected={sizeSelected === 'medium'}
            />
            <Item
              name="large"
              price={25}
              callback={onSizeClicked}
              selected={sizeSelected === 'large'}
            />
          </div>
          {sizeSelected && (
            <div className="mb-8">
              <p className="mb-8 mt-8">
                Choose any combination of the following toppings:
              </p>
              <div className="flex flex-col items-center">
                <Item
                  name="olives"
                  price={3}
                  callback={onToppingClicked}
                  selected={toppingSelected.includes('olives')}
                />
                <Item
                  name="pepperoni"
                  price={4}
                  callback={onToppingClicked}
                  selected={toppingSelected.includes('pepperoni')}
                />
                <Item
                  name="mushrooms"
                  price={2}
                  callback={onToppingClicked}
                  selected={toppingSelected.includes('mushrooms')}
                />
                <Item
                  name="pepper"
                  price={2}
                  callback={onToppingClicked}
                  selected={toppingSelected.includes('pepper')}
                />
              </div>
            </div>
          )}
          {sizeSelected && (
            <div className="space-x-4">
              <Button name="ADD" callback={onAddClicked} />
              <Button
                name="RESET CURRENT SELECTION"
                callback={onResetClicked}
              />
            </div>
          )}
        </div>
        <div className="px-8">
          {overview && <p className="text-center mb-16">Cart</p>}
          {overview &&
            overview.pizzaList.map((pizza, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="mb-4" key={index}>
                <p>{`Pizza ${index + 1}`}</p>
                <ul className="pl-4 list-disc">
                  <li>{`Size ${pizza.size}`}</li>
                  <li>
                    {pizza.toppings.length > 0
                      ? `Toppings ${pizza.toppings}`
                      : 'No Toppings'}
                  </li>
                </ul>
              </div>
            ))}
          {overview && (
            <div className="mt-8 flex justify-center items-center space-x-4">
              <p>{`total ${overview.price}$`}</p>
              <Button name="CHECKOUT" callback={onCheckoutClicked} />
              <Button name="RESET CART" callback={onResetCartClicked} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Menu
