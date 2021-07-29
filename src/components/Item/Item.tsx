import { Sizes, Toppings } from '../../types'

type ComponentProps = {
  name: Sizes | Toppings
  price: number
  image?: string
  callback: (name: Sizes | Toppings, price: number) => void
  selected: boolean
}

function Item({
  name,
  price,
  image,
  callback,
  selected,
}: ComponentProps): JSX.Element {
  function onClickHandler() {
    callback(name, price)
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={`inline-block w-60 flex flex-col justify-center space-x-4 border-2 h-20 mb-2 rounded-md cursor-pointer hover:border-blue-500 ${
        selected && 'bg-red-300'
      }`}
      onClick={onClickHandler}
    >
      {`${name} ${price}$`}
    </div>
  )
}

export default Item
