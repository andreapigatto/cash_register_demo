import './Toggle.css'

type ComponentProps = {
  checked: boolean
  label: string
  onChange: () => void
}

function Toggle({ label, checked, onChange }: ComponentProps): JSX.Element {
  function onChangeHandler() {
    onChange()
  }

  return (
    <>
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          checked={checked}
          onChange={onChangeHandler}
        />
        <label
          htmlFor="toggle"
          className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
        />
      </div>
      <label htmlFor="toggle" className="text-xs text-gray-700">
        {label}
      </label>
    </>
  )
}

export default Toggle
