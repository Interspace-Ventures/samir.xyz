import { Route, Switch } from 'wouter'
import Home from '@/pages/index'
import Ventures from '@/pages/ventures'

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/ventures" component={Ventures} />
    </Switch>
  )
}