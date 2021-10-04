import { SingleValue } from 'react-select'
import { useRecoilState } from 'recoil'
import { useHistory } from 'react-router-dom'

import Layout from '../Layout/Layout'
import Button from '../components/Button/Button'
import Select from '../components/Select/Select'

import { Regions, Selected } from '../types'
import regionAtom from '../atoms/RegionAtom'

const regions: Regions[] = ['UK', 'Wales']

function Intro(): JSX.Element {
  const [region, setRegion] = useRecoilState<Selected>(regionAtom)
  const history = useHistory()

  function onChangeSelectHandler(selectedItem: SingleValue<Selected>) {
    if (selectedItem) setRegion(selectedItem)
  }

  function onConfirmClicked() {
    history.push('/menu')
  }

  return (
    <Layout>
      <div className="mx-auto w-64">
        <p>Select a region</p>
        <Select
          options={regions.map((item) => ({
            value: item,
            label: item,
          }))}
          selected={region}
          onChange={onChangeSelectHandler}
        />
        <div className="flex justify-center mt-8">
          <Button name="CONFIRM" callback={onConfirmClicked} />
        </div>
      </div>
    </Layout>
  )
}

export default Intro
