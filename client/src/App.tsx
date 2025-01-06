import { FC } from "react";
import { Switch, Route } from "wouter";
import { Layout } from "./components/Layout";
import { Profile } from "./pages/Profile";
import { Portfolio } from "./pages/Portfolio";

const App: FC = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Profile} />
        <Route path="/profile" component={Profile} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/interspace" component={() => {
          window.location.href = "https://interspace.samir.xyz";
          return null;
        }} />
        <Route path="/perspectives" component={() => {
          window.location.href = "https://perspectives.samir.xyz";
          return null;
        }} />
      </Switch>
    </Layout>
  );
};

export default App;