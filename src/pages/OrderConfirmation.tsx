import { useRecoilValue } from 'recoil'
import orderAtom from '../atoms/OrderAtom'
import Layout from '../Layout/Layout'

function UserCredentials(): JSX.Element {
  const order = useRecoilValue(orderAtom)

  return (
    <Layout>
      <p className="text-center text-lg text-green-500">Order Confirmed!</p>
      <p className="mt-8 text-center text-sm text-gray-400">Output JSON:</p>
      <p className="text-center text-sm text-gray-500">
        {JSON.stringify(order)}
      </p>
    </Layout>
  )
}

export default UserCredentials
