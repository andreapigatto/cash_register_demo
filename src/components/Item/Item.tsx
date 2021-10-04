import { Items } from '../../types'

type ComponentProps = {
  name: Items
  price: number
  callback: (name: Items) => void
  selected: boolean
}

function Item({
  name,
  price,
  callback,
  selected,
}: ComponentProps): JSX.Element {
  function onClickHandler() {
    callback(name)
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={`inline-block w-60 flex flex-col justify-center space-x-4 border-2 h-20 mb-2 rounded-md cursor-pointer hover:border-blue-500 ${
        selected && 'bg-red-300'
      }`}
      onClick={onClickHandler}
    >
      {`${name} ${price}£`}
    </div>
  )
}

export default Item
