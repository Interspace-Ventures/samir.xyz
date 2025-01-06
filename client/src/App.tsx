import { Switch, Route } from "wouter";
import { Layout } from "./components/Layout";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Profile} />
        <Route path="/profile" component={Profile} />
        {/* Other routes will be added later */}
      </Switch>
    </Layout>
  );
}

export default App;
