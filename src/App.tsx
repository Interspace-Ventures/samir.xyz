import { FC } from "react";
import { Switch, Route, Redirect } from "wouter";
import { Layout } from "./components/Layout";
import { Profile } from "./pages/Profile";
import { Portfolio } from "./pages/Portfolio";
import { NotFound } from "./components/NotFound";

const App: FC = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={() => <Redirect to="/profile" />} />
        <Route path="/profile" component={Profile} />
        <Route path="/portfolio" component={Portfolio} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default App;