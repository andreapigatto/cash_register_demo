import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import orderAtom from '../atoms/OrderAtom'
import Layout from '../Layout/Layout'

function UserCredentials(): JSX.Element {
  const order = useRecoilValue(orderAtom)

  useEffect(() => {
    console.log(order)
    console.log(JSON.stringify(order))
  }, [])

  return (
    <Layout>
      <p className="text-center text-lg text-green-500">Order Confirmed!</p>
      <p className="text-center text-sm text-gray-300">Check log for JSON</p>
    </Layout>
  )
}

export default UserCredentials
