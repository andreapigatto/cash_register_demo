import { Route, Switch, Redirect } from 'react-router-dom'
import { Menu, OrderConfirmation, Intro } from './pages'

function App(): JSX.Element {
  return (
    <Switch>
      <Route path="/order-confirmed" component={OrderConfirmation} />
      <Route path="/menu" exact component={Menu} />
      <Route path="/" exact component={Intro} />
      <Redirect to="/" />
    </Switch>
  )
}

export default App
