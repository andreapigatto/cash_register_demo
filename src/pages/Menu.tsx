import { useState, useEffect, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { useHistory } from 'react-router-dom'

import Layout from '../Layout/Layout'
import Item from '../components/Item/Item'
import Button from '../components/Button/Button'
import Toggle from '../components/Toggle/Toggle'

import { Items } from '../types'
import orderAtom from '../atoms/OrderAtom'
import regionAtom from '../atoms/RegionAtom'

import { items, rules, bag } from '../config'

function Menu(): JSX.Element {
  const [itemSelected, setItemSelected] = useState<Items | ''>('')
  const [numItems, setNumItems] = useState(0)
  const [total, setTotal] = useState(0)
  const [itemsList, setItemsList] = useState<
    | {
        item: Items
        price: number
      }[]
    | null
  >(null)
  const [resetClicked, setResetClicked] = useState(false)
  const [order, setOrder] = useRecoilState(orderAtom)
  const [region] = useRecoilState(regionAtom)
  const [isBag, setIsBag] = useState(false)

  const history = useHistory()

  const numBags = useMemo(() => Math.ceil(numItems / bag.maxItems), [numItems])

  useEffect(() => {
    if (bag && itemsList) {
      if (isBag) {
        const newItems = itemsList
        const bagExist = newItems.find((item) => item.item === 'bag')
        if (!bagExist) {
          Array.from(Array(numBags).keys()).forEach((_) => {
            newItems.push({
              item: 'bag',
              price: bag.price[region.value],
            })
          })
          setItemsList(newItems)
          setTotal((tot) => tot + bag.price[region.value] * numBags)
        } else {
          const newItemsNoBag = newItems.filter((item) => item.item !== 'bag')
          Array.from(Array(numBags).keys()).forEach((_) => {
            newItemsNoBag.push({
              item: 'bag',
              price: bag.price[region.value],
            })
          })
          setItemsList(newItemsNoBag)
        }
      } else {
        const bagExist = itemsList.find((item) => item.item === 'bag')
        if (bagExist) {
          const newItems = itemsList.filter((item) => item.item !== 'bag')
          setItemsList(newItems)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBag, numBags])

  useEffect(() => {
    if (itemsList) {
      const tot = itemsList
        .map((item) => item.price)
        .reduce((agg, item) => agg + item, 0)
      setTotal(tot)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(itemsList)])

  function checkRules() {
    const rule = rules.find((r) => r.item === itemSelected)
    if (!rule) return false
    if (!itemsList) return false
    const checkCount = itemsList.filter(
      (item) => item.item === itemSelected
    ).length
    return checkCount === rule.count - 1
  }

  function removeItems() {
    const rule = rules.find((r) => r.item === itemSelected)
    if (!rule) return false
    if (!itemsList) return false
    const newItems = itemsList.filter((item) => item.item !== itemSelected)
    const checkCount = itemsList.filter(
      (item) => item.item === itemSelected
    ).length
    let i = rule.count
    while (i < checkCount) {
      newItems.push({
        item: itemSelected as Items,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        price: items.find((item) => item.item === itemSelected)!.price,
      })
      // eslint-disable-next-line no-plusplus
      i++
    }
    return newItems
  }

  function onAddClicked() {
    let itemsListNew = itemsList || []
    const isRule = checkRules()

    if (isRule) {
      const newItems = removeItems()
      if (newItems) {
        itemsListNew = newItems
        itemsListNew.push({
          item: `Special Price - ${itemSelected}` as Items,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          price: rules.find((r) => r.item === itemSelected)!.price,
        })

        setItemsList(itemsListNew)
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { price } = items.find((item) => item.item === itemSelected)!

      itemsListNew.push({
        item: itemSelected as Items,
        price,
      })
      setItemsList(itemsListNew)
    }

    setNumItems((num) => num + 1)
    setItemSelected('')
    setResetClicked(!resetClicked)
  }

  function onItemClicked(name: Items) {
    setItemSelected(name as Items)
  }

  function onResetCartClicked() {
    setItemSelected('')
    setTotal(0)
    setItemsList(null)
    setResetClicked(!resetClicked)
    setIsBag(false)
  }

  function onCheckoutClicked() {
    setOrder({ ...order, itemsList, total, currency: 'GPB' })
    history.push('/order-confirmed')
  }

  function onChangeCheckboxHandler() {
    setIsBag((value) => !value)
  }

  return (
    <Layout>
      <div
        className={`grid ${itemsList ? 'md:grid-cols-2' : ''}`}
        data-test="menu-container"
      >
        <div className="px-8 text-center">
          <p className="mb-8">Choose one of the Items:</p>
          <div className="flex flex-col items-center">
            {items.map((item) => (
              <Item
                key={item.item}
                name={item.item}
                price={item.price}
                callback={onItemClicked}
                selected={itemSelected === item.item}
              />
            ))}
          </div>
          {itemSelected && <Button name="ADD" callback={onAddClicked} />}
        </div>
        <div className="px-8">
          {itemsList && (
            <>
              <p className="text-center mb-8">Cart</p>
              <div className="flex justify-end mb-8">
                <Toggle
                  label="add bag/s"
                  checked={isBag}
                  onChange={onChangeCheckboxHandler}
                />
              </div>
              {itemsList
                .filter((item) => item.item !== 'bag')
                .map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className="mb-4 mx-16" key={index}>
                    <ul className="pl-4 list-disc">
                      <li>
                        <div className="flex justify-between">
                          <p>{`Item ${item.item}`}</p>
                          <p>{`${item.price} £`}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                ))}
              {isBag && (
                // eslint-disable-next-line react/no-array-index-key
                <div className="mb-4 mx-16">
                  <ul className="pl-4 list-disc">
                    <li>
                      <div className="flex justify-between">
                        <p>{`${numBags} ${numBags === 1 ? 'bag' : 'bags'}`}</p>
                        <p>{`${bag.price[region.value] * numBags} £`}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
              <div className="mt-12 flex justify-center items-center space-x-4">
                <p>{`total ${total}£`}</p>
                <Button name="CHECKOUT" callback={onCheckoutClicked} />
                <Button name="RESET CART" callback={onResetCartClicked} />
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Menu
