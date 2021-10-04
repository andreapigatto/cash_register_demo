import Select, { SingleValue } from 'react-select'

import { Selected } from '../../types'

type ComponentProps = {
  options: Selected[]
  selected: Selected
  onChange: (selectedItem: SingleValue<Selected>) => void
}

function SelectComp({
  options,
  selected,
  onChange,
}: ComponentProps): JSX.Element {
  const onChangeHandler = (selectedItem: SingleValue<Selected>) => {
    onChange(selectedItem)
  }
  return (
    <Select options={options} value={selected} onChange={onChangeHandler} />
  )
}

export default SelectComp
