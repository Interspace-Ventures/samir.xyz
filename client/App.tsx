import React, { FC } from "react";
import { Switch, Route } from "wouter";
import { Layout } from "./components/layout/Layout";
import { About } from "./pages/About";
import { Portfolio } from "./pages/Portfolio";
import { Ventures } from "./pages/Ventures";
import { NotFound } from "./components/layout/NotFound";

const App: FC = () => (
  <Layout>
    <Switch>
      <Route path="/" component={About} />
      <Route path="/about" component={About} />
      <Route path="/profile" component={About} /> {/* Keep for backward compatibility */}
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/ventures" component={Ventures} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
);

export default App;