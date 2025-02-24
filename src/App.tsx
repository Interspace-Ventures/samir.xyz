import React, { FC } from "react";
import { Switch, Route } from "wouter";
import { Layout } from "./components/Layout";
import { Profile } from "./pages/Profile";
import { Portfolio } from "./pages/Portfolio";
import { NotFound } from "./components/NotFound";

const App: FC = () => (
  <Layout>
    <Switch>
      <Route path="/" component={Profile} />
      <Route path="/profile" component={Profile} />
      <Route path="/portfolio" component={Portfolio} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
);

export default App;