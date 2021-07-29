import { Route, Switch, Redirect } from 'react-router-dom'
import { UserCredentials, Menu, PaymentInfo, OrderConfirmation } from './pages'

function App(): JSX.Element {
  return (
    <Switch>
      <Route path="/menu" component={Menu} />
      <Route path="/checkout" component={PaymentInfo} />
      <Route path="/order-confirmed" component={OrderConfirmation} />
      <Route path="/" exact component={UserCredentials} />
      <Redirect to="/" />
    </Switch>
  )
}

export default App
