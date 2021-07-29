import { MouseEvent } from 'react'
import { useHistory } from 'react-router-dom'

type ComponentProps = {
  name: string
  link?: string
  callback?: (event: MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

function Button({
  name,
  link,
  callback,
  type,
  disabled,
}: ComponentProps): JSX.Element {
  const history = useHistory()

  function onClickHandler(event: MouseEvent<HTMLButtonElement>) {
    // eslint-disable-next-line no-unused-expressions
    callback && callback(event)
    // eslint-disable-next-line no-unused-expressions
    link && link && history.push(link)
  }

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type || 'button'}
      className={`px-4 py-1 rounded-lg ${
        disabled
          ? 'bg-grey-500 cursor-not-allowed border-2'
          : 'text-white bg-blue-500 hover:bg-blue-600'
      }`}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {name}
    </button>
  )
}

export default Button
